# ---- Stage 1: build ----
FROM node:22-alpine AS build
WORKDIR /app

# Match the npm version that wrote package-lock.json, so npm ci reads it the same way
RUN npm install -g npm@11.6.4

COPY package.json package-lock.json ./
RUN npm ci

COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN npm run build

# Keep only production dependencies for the next stage
RUN npm prune --omit=dev

# ---- Stage 2: run ----
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Run as the unprivileged "node" user that ships with the image
USER node
EXPOSE 3000

# No secrets here: DB_*, JWT_* and REDIS_* come from docker compose at runtime
CMD ["sh", "-c", "npm run migration:run:prod && node dist/main.js"]
