FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN if [ -f package-lock.json ]; then npm ci --omit=dev=false; else npm install; fi

COPY . .

RUN npm run build:prod

FROM nginx:1.27-alpine
EXPOSE 8080

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/cook/browser /usr/share/nginx/html