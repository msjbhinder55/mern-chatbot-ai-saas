# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port (if using Express, for example)
EXPOSE 5000

# Start the server
CMD ["npm", "run", "start"]
