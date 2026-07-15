# Use Node.js 22 LTS
FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Expose application port
EXPOSE 8081

# Start the application
CMD ["node", "server.js"]