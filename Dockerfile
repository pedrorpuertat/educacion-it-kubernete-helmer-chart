FROM node:18-alpine AS deps


WORKDIR /app


COPY package.json ./
RUN npm install


FROM node:18-alpine AS builder


WORKDIR /app


COPY --from=deps /app/node_modules ./node_modules
COPY . .


RUN npm install
RUN npm run build


ENV NODE_ENV=production
RUN npm ci --only=production \
    && npm cache clean --force


FROM node:18-alpine AS runner


WORKDIR /app


COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/node_modules ./node_modules


USER node


CMD ["node", "dist/main.js"]
