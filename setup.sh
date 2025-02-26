#!/bin/bash

echo "=== Task 1: Linux System Administration ==="

# 1. Create a systemd service for an Express.js server
SERVICE_NAME="chatbot-server"
APP_DIR="/opt/$SERVICE_NAME"
NODE_APP="$APP_DIR/server.js"

echo "Creating Express.js server..."
sudo mkdir -p "$APP_DIR"

# Create a simple Express.js server
cat <<EOL | sudo tee "$NODE_APP"
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Chatbot AI Server is running...');
});

app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
EOL

# Install Node.js if not installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    sudo apt update && sudo apt install -y nodejs npm
fi

# Install dependencies
cd "$APP_DIR" && npm init -y && npm install express

# Create a systemd service file
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME.service"

cat <<EOL | sudo tee "$SERVICE_FILE"
[Unit]
Description=Chatbot AI Express.js Server
After=network.target

[Service]
ExecStart=/usr/bin/node $NODE_APP
WorkingDirectory=$APP_DIR
Restart=always
User=nobody
Group=nogroup
Environment=PORT=5000

[Install]
WantedBy=multi-user.target
EOL

# Reload systemd, enable and start the service
echo "Enabling and starting $SERVICE_NAME service..."
sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE_NAME"
sudo systemctl start "$SERVICE_NAME"

# 2. Kernel tuning: Increase net.core.somaxconn
echo "Tuning kernel parameters..."
SYSCTL_CONF="/etc/sysctl.conf"

echo "net.core.somaxconn=1024" | sudo tee -a "$SYSCTL_CONF"
sudo sysctl -p

# 3. Firewall Setup: Allow only HTTP/HTTPS traffic
echo "Configuring firewall..."
sudo ufw allow http
sudo ufw allow https
sudo ufw default deny incoming
sudo ufw enable

echo "All tasks completed!"

