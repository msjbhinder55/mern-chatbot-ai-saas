#!/bin/bash

LOG_FILE="${1:-/var/log/nginx/access.log}"  # Default log path
TEMP_FILE="/tmp/ip_counts.tmp"

# Check if log file exists
if [ ! -f "$LOG_FILE" ]; then
    echo "Error: Log file '$LOG_FILE' not found!"
    exit 1
fi

analyze_logs() {
    echo "Analyzing log file: $LOG_FILE"
    echo ""

    # Extract IP addresses and count their occurrences
    awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -nr > "$TEMP_FILE"

    total_requests=$(awk '{sum+=$1} END {print sum}' "$TEMP_FILE")
    unique_ips=$(wc -l < "$TEMP_FILE")

    echo "Total requests: $total_requests"
    echo "Unique IP addresses: $unique_ips"
    echo ""

    echo "Top 3 IP addresses by request count:"
    head -n 3 "$TEMP_FILE" | awk -v total="$total_requests" '{printf "%-15s - %4d requests (%.1f%%)\n", $2, $1, ($1/total)*100}'

    rm -f "$TEMP_FILE"
}

analyze_logs
