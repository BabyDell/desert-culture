# Stage 1: Dependencies
FROM node:23-alpine AS deps
WORKDIR /app

# Install dependencies needed for Prisma and build
RUN apk add --no-cache libc6-compat 

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Stage 2: Builder
FROM node:23-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG POSTGRES_PRISMA_URL
ARG POSTGRES_URL_NON_POOLING

# Make sure Prisma can access the environment variables at build time
ENV POSTGRES_PRISMA_URL=${POSTGRES_PRISMA_URL}
ENV POSTGRES_URL_NON_POOLING=${POSTGRES_URL_NON_POOLING}    

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Stage 3: Runner
FROM node:23-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Create a non-root user to run the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]