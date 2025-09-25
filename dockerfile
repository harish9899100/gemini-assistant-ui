FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV NEXT_DISABLE_ESLINT=true
RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /gemini-assistant-ui ./

ENV NODE_ENV=production

COPY .env.local .env.local

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD [ "npm", "start"]