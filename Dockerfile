FROM node:latest AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM node:latest AS runner

WORKDIR /app

COPY --from=builder /app/dist ./
COPY --from=builder /app/package*.json ./

RUN npm install --only=production

CMD ["node", "index.js"]