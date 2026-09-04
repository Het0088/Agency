# 🚀 Hostinger VPS Deployment Guide for Omniranq (Next.js + MySQL + PM2 + Nginx)

This guide walks you through deploying this Next.js project onto your **Hostinger VPS** (Ubuntu 22.04 / 24.04 LTS).

---

## 📋 Overview of What We Will Set Up
1. **Node.js 20 LTS** & **PM2** (to keep Next.js running 24/7 in the background with auto-restart on reboot).
2. **MySQL Server** (to store blog posts, admin CMS content blocks, and page meta tags).
3. **Nginx Web Server** (as a high-performance reverse proxy with 25MB upload support for blog images).
4. **Certbot / Let's Encrypt** (for free 100% automated SSL / HTTPS).
5. **Firewall (UFW)** (securing ports 22, 80, 443).

---

## ⚡ Option A: Quick Automated Setup (Recommended)

If you have a fresh Hostinger VPS running Ubuntu, you can deploy in just a few terminal commands!

### Step 1: Connect to your Hostinger VPS via SSH
Open your Terminal (Mac/Linux) or PowerShell / PuTTY (Windows):
```bash
ssh root@YOUR_HOSTINGER_VPS_IP
```
*(Enter your VPS root password when prompted)*

---

### Step 2: Clone the Repository
Run the following commands on your VPS:
```bash
# Create and move to the web directory
sudo mkdir -p /var/www
cd /var/www

# Clone your repository
git clone https://github.com/Het0088/Agency.git agency
cd agency
```

*(If your repo is private, use a GitHub Personal Access Token or SSH Deploy Key)*

---

### Step 3: Run the Auto-Setup Script
Make the setup script executable and run it:
```bash
chmod +x deploy/setup.sh deploy/update.sh
sudo bash deploy/setup.sh
```

**What this script automatically does:**
- Updates your VPS packages.
- Installs Node.js 20, Git, Nginx, MySQL, PM2, and Certbot.
- Creates the `omniranq` MySQL database and imports all tables (`posts`, `page_content`, `page_meta`, `cities`).
- Creates `.env.local` with database credentials and sets `ADMIN_PASSWORD=Valga@123`.
- Creates `public/uploads` with writable permissions for image uploads.
- Compiles the Next.js production build (`npm run build`).
- Starts the app with PM2 and configures it to start automatically on server reboots.
- Configures Nginx reverse proxy on port 80.

---

### Step 4: Point Your Domain & Enable Free SSL (HTTPS)

1. **DNS Setup in Hostinger / Cloudflare / Namecheap:**
   - Add an **A Record**:
     - **Host:** `@` (or leave empty) ➔ **Points to:** `YOUR_HOSTINGER_VPS_IP`
   - Add a second **A Record** (or CNAME) for `www`:
     - **Host:** `www` ➔ **Points to:** `YOUR_HOSTINGER_VPS_IP`

2. **Update your domain in Nginx:**
   Edit `/etc/nginx/sites-available/agency`:
   ```bash
   sudo nano /etc/nginx/sites-available/agency
   ```
   Change line 7:
   ```nginx
   server_name yourdomain.com www.yourdomain.com;
   ```
   Save and exit (`CTRL+O`, `ENTER`, then `CTRL+X`).

   Reload Nginx:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

3. **Get Free SSL Certificate (Certbot):**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```
   - Enter your email address.
   - Agree to terms.
   - Certbot will automatically configure HTTPS redirection!

---

## 🛠️ Option B: Step-by-Step Manual Setup

If you prefer doing each step manually or need custom fine-tuning:

### 1. Update the Server
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw nginx mysql-server build-essential certbot python3-certbot-nginx
```

### 2. Install Node.js 20 LTS & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### 3. Setup MySQL Database
```bash
sudo mysql
```
Inside the MySQL prompt:
```sql
CREATE DATABASE IF NOT EXISTS omniranq CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'omniranq_user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON omniranq.* TO 'omniranq_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Import initial schema & sample data:
```bash
cd /var/www/agency
mysql -u omniranq_user -p'YourSecurePassword123!' omniranq < data/setup.sql
```

### 4. Configure Environment Variables (`.env.local`)
```bash
nano /var/www/agency/.env.local
```
Paste the following values:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=omniranq_user
DB_PASSWORD=YourSecurePassword123!
DB_NAME=omniranq

ADMIN_PASSWORD=Valga@123
HMAC_SECRET=omniranq-session-key-2026-production
CONTENT_API_KEY=omniranq-n8n-secret-key

# Email configuration for contact forms
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=hetpatel2220087607@gmail.com
SMTP_PASS=vupo eczu ptgl jszs
NOTIFY_EMAIL=hetpatel222008@gmail.com

NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 5. Setup Permissions for Uploads
```bash
mkdir -p /var/www/agency/public/uploads
chmod -R 775 /var/www/agency/public/uploads
sudo chown -R www-data:www-data /var/www/agency/public/uploads
```

### 6. Build the Next.js App
```bash
cd /var/www/agency
npm install
npm run build
```

### 7. Start PM2 Process
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd
```
*(Copy and run the `sudo env PATH=...` command that PM2 prints on screen)*

### 8. Setup Nginx
```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/agency
sudo nano /etc/nginx/sites-available/agency
# Change 'yourdomain.com' to your real domain name
sudo ln -sf /etc/nginx/sites-available/agency /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### 9. Configure Firewall
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

---

## 🔄 How to Push Future Updates (Zero Downtime)

Whenever you commit and push new code from your computer to GitHub, update your VPS by running:
```bash
cd /var/www/agency
sudo bash deploy/update.sh
```

Or run manually:
```bash
cd /var/www/agency
git pull origin main
npm install
npm run build
pm2 restart agency-web
```

---

## 🔍 Useful Commands for Managing Your VPS

| Action | Command |
| :--- | :--- |
| **Check Website Status** | `pm2 status` |
| **View Real-Time Logs** | `pm2 logs agency-web` |
| **Restart Next.js App** | `pm2 restart agency-web` |
| **Restart Nginx** | `sudo systemctl restart nginx` |
| **Test Nginx Config** | `sudo nginx -t` |
| **Access MySQL CLI** | `mysql -u omniranq_user -p omniranq` |
| **Renew SSL Certificate** | `sudo certbot renew` (Auto-renews automatically) |

---

## 🛡️ Admin Panel Verification
Once deployed, you can access your live Admin Panel at:
`https://yourdomain.com/admin`

- **Admin Password:** `Valga@123`
- All rich text features (Image upload, hyperlink insertion, tables, embeds) and page content blocks will be fully editable and saved directly into your VPS MySQL database!
