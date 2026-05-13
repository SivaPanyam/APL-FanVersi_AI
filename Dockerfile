# Stage 1: Build the backend
FROM node:20 AS server-builder
WORKDIR /app
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci
COPY server/ ./
RUN npm run build

# Stage 2: Production runtime
FROM node:20-slim
WORKDIR /app

# Copy built server
COPY --from=server-builder /app/server/dist ./server/dist
COPY --from=server-builder /app/server/package*.json ./server/

# Copy pre-built client dist (built locally to avoid cloud build issues)
COPY client/dist ./server/public

WORKDIR /app/server
RUN npm install --production

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/index.js"]
