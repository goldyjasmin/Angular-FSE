FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/273690-Hackathon_SPA/* /usr/share/nginx/html/