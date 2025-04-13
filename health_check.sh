#!/bin/bash

SERVICE_NAME="chatbot-server"
LOG_FILE="/var/log/chatbot_health.log"
MAX_RETRIES=3
RETRY_DELAY=5

# Create log file if it doesn't exist
sudo touch "$LOG_FILE"
sudo chown $(whoami):$(whoami) "$LOG_FILE"

log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

check_service() {
    if systemctl is-active --quiet "$SERVICE_NAME"; then
        log_message "$SERVICE_NAME is running normally."
        return 0
    else
        log_message "$SERVICE_NAME is NOT running!"
        return 1
    fi
}

restart_service() {
    local retry=0
    while [ $retry -lt $MAX_RETRIES ]; do
        log_message "Attempt $((retry+1)) to restart $SERVICE_NAME..."
        sudo systemctl restart "$SERVICE_NAME"
        
        sleep $RETRY_DELAY
        
        if check_service; then
            log_message "Successfully restarted $SERVICE_NAME."
            return 0
        fi
        
        ((retry++))
    done
    
    log_message "Failed to restart $SERVICE_NAME after $MAX_RETRIES attempts."
    return 1
}

# Main execution
if ! check_service; then
    restart_service
    
    if [ $? -ne 0 ]; then
        log_message "Critical: Could not restart $SERVICE_NAME. Manual intervention required."
        # You could add email notification here
        exit 1
    fi
fi

exit 0