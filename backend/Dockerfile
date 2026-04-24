# Strapi 5 — use with Docker, Railway, Render, Fly.io, etc.
# Set env vars in the host (see ../DEPLOY.md). Prefer PostgreSQL in production.
FROM node:20-bookworm-slim AS runner
WORKDIR /app

# Native deps for better-sqlite3 (local SQLite) and other optional builds
RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential python3 \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]
