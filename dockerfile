FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
# Remove the yarn.lock line since you're using npm

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]