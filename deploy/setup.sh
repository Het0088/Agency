#!/usr/bin/env bash
# ==============================================================================
# Hostinger VPS Auto-Setup & Deployment Script for Omniranq Next.js Application
# Target OS: Ubuntu 22.04 / 24.04 LTS or Debian 11 / 12
# ==============================================================================

set -e

# Color helpers
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}=====================================================${NC}"
echo -e "${CYAN}   Omniranq Hostinger VPS Automated Setup Script     ${NC}"
echo -e "${CYAN}=====================================================${NC}"

# Check root/sudo
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[ERROR] Please run this script with sudo or as root: sudo bash deploy/setup.sh${NC}"
  exit 1
fi

APP_DIR="$(pwd)"
echo -e "${YELLOW}>> Working Directory: ${APP_DIR}${NC}"

# 1. Update system packages
echo -e "\n${YELLOW}>> [1/8] Updating Ubuntu system packages...${NC}"
apt-get update -y
DEBIAN_FRONTEND=noninteractive apt-get upgrade -y

# 2. Install essential dependencies
echo -e "\n${YELLOW}>> [2/8] Installing curl, git, build-essential, ufw, nginx, certbot...${NC}"
apt-get install -y curl git ufw build-essential nginx certbot python3-certbot-nginx mysql-server

# 3. Install Node.js 20 LTS via official NodeSource repository
echo -e "\n${YELLOW}>> [3/8] Installing Node.js 20 LTS and PM2...${NC}"
if ! command -v node >/dev/null 2>&1 || [[ $(node -v | cut -d'.' -f1 | tr -d 'v') -lt 18 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

echo -e "${GREEN}✓ Node.js version: $(node -v)${NC}"
echo -e "${GREEN}✓ npm version: $(npm -v)${NC}"

# Install PM2 globally
npm install -g pm2

# 4. Configure MySQL Database
echo -e "\n${YELLOW}>> [4/8] Configuring MySQL Database...${NC}"
systemctl start mysql
systemctl enable mysql

DB_NAME="omniranq"
DB_USER="omniranq_user"

# Generate or read DB Password
if [ -f "$APP_DIR/.env.local" ] && grep -q "DB_PASSWORD=" "$APP_DIR/.env.local"; then
  DB_PASS=$(grep "DB_PASSWORD=" "$APP_DIR/.env.local" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
fi

if [ -z "$DB_PASS" ]; then
  DB_PASS=$(openssl rand -base64 16 | tr -dc 'a-zA-Z0-9' | head -c 16)
fi

echo -e "Creating MySQL database and user..."
mysql -e "CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -e "CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED WITH mysql_native_password BY '${DB_PASS}';"
mysql -e "ALTER USER '${DB_USER}'@'localhost' IDENTIFIED WITH mysql_native_password BY '${DB_PASS}';"
mysql -e "GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

# Import initial schema if setup.sql exists
if [ -f "$APP_DIR/data/setup.sql" ]; then
  echo -e "Importing data/setup.sql into MySQL..."
  mysql -u "${DB_USER}" -p"${DB_PASS}" "${DB_NAME}" < "$APP_DIR/data/setup.sql" || mysql "${DB_NAME}" < "$APP_DIR/data/setup.sql"
  echo -e "${GREEN}✓ MySQL database & schema initialized.${NC}"
fi

# 5. Environment Variables Setup (.env.local)
echo -e "\n${YELLOW}>> [5/8] Setting up .env.local configuration...${NC}"
if [ ! -f "$APP_DIR/.env.local" ]; then
  cat <<EOF > "$APP_DIR/.env.local"
DB_HOST=localhost
DB_PORT=3306
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASS}
DB_NAME=${DB_NAME}

ADMIN_PASSWORD=Valga@123
HMAC_SECRET=$(openssl rand -hex 16)
CONTENT_API_KEY=$(openssl rand -hex 12)

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
NOTIFY_EMAIL=hello@omniranq.com

NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF
  echo -e "${GREEN}✓ Created new .env.local file with generated credentials.${NC}"
else
  # Ensure DB credentials match the newly configured user
  sed -i "s/^DB_USER=.*/DB_USER=${DB_USER}/" "$APP_DIR/.env.local"
  sed -i "s/^DB_PASSWORD=.*/DB_PASSWORD=${DB_PASS}/" "$APP_DIR/.env.local"
  sed -i "s/^DB_NAME=.*/DB_NAME=${DB_NAME}/" "$APP_DIR/.env.local"
  echo -e "${GREEN}✓ Updated database credentials in existing .env.local.${NC}"
fi

# 6. Set directory permissions for file uploads
echo -e "\n${YELLOW}>> [6/8] Configuring uploads directory and permissions...${NC}"
mkdir -p "$APP_DIR/public/uploads"
chmod -R 775 "$APP_DIR/public/uploads"
chown -R www-data:www-data "$APP_DIR/public/uploads" 2>/dev/null || true

# 7. Install dependencies and build Next.js application
echo -e "\n${YELLOW}>> [7/8] Installing npm dependencies and building Next.js application...${NC}"
npm install --production=false
npm run build

# Start or reload PM2
pm2 stop agency-web 2>/dev/null || true
pm2 delete agency-web 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u root --hp /root --force 2>/dev/null || true

# 8. Configure Nginx and UFW Firewall
echo -e "\n${YELLOW}>> [8/8] Setting up Nginx reverse proxy and firewall...${NC}"

# Update Nginx path in config if deployed at custom folder
sed -i "s|/var/www/agency|$APP_DIR|g" "$APP_DIR/deploy/nginx.conf"

cp "$APP_DIR/deploy/nginx.conf" /etc/nginx/sites-available/agency
ln -sf /etc/nginx/sites-available/agency /etc/nginx/sites-enabled/agency
rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
nginx -t
systemctl restart nginx
systemctl enable nginx

# Configure UFW
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo -e "\n${GREEN}=====================================================${NC}"
echo -e "${GREEN}   DEPLOYMENT COMPLETED SUCCESSFULLY!                ${NC}"
echo -e "${GREEN}=====================================================${NC}"
echo -e "Your Next.js app is now running in the background via PM2."
echo -e "Nginx is reverse-proxying port 80 -> port 3000."
echo -e ""
echo -e "${CYAN}Next Steps:${NC}"
echo -e "1. Point your Domain's DNS 'A' Record to this VPS Public IP address."
echo -e "2. Update your domain name in: /etc/nginx/sites-available/agency"
echo -e "   Then run: sudo nginx -t && sudo systemctl reload nginx"
echo -e "3. Install free SSL certificate with Let's Encrypt:"
echo -e "   ${YELLOW}sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com${NC}"
echo -e "4. Check PM2 status: ${YELLOW}pm2 status${NC}"
echo -e "5. View live logs: ${YELLOW}pm2 logs agency-web${NC}"
echo -e "${GREEN}=====================================================${NC}"
