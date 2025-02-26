#!/bin/bash

SERVICE_NAME="chatbot-server"
LOG_FILE="/var/log/chatbot_health.log"

# Check if the service is running
if ! systemctl is-active --quiet "$SERVICE_NAME"; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $SERVICE_NAME is down! Restarting..." | sudo tee -a "$LOG_FILE"
    sudo systemctl restart "$SERVICE_NAME"
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $SERVICE_NAME restarted successfully." | sudo tee -a "$LOG_FILE"
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $SERVICE_NAME is running fine." | sudo tee -a "$LOG_FILE"
fi

