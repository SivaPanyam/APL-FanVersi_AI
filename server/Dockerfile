# Build Stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# Production Stage
FROM node:20-slim

WORKDIR /app

# Copy production dependencies only
COPY package*.json ./
RUN npm install --production

# Copy built assets from builder
COPY --from=builder /app/dist ./dist

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start server
CMD ["node", "dist/index.js"]
