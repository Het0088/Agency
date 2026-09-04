#!/usr/bin/env bash
# ==============================================================================
# Omniranq VPS Quick Update Script
# Run this script whenever you push new changes to GitHub and want to update the VPS
# ==============================================================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}>> Pulling latest changes from Git...${NC}"
git pull origin main

echo -e "${YELLOW}>> Installing new dependencies...${NC}"
npm install

echo -e "${YELLOW}>> Building Next.js application...${NC}"
npm run build

echo -e "${YELLOW}>> Restarting PM2 process...${NC}"
pm2 restart agency-web

echo -e "${GREEN}✓ Update complete! Website is live with latest changes.${NC}"
