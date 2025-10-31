FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build:prod

RUN if [ -f /app/dist/tasteThread/browser/index.csr.html ]; then mv /app/dist/tasteThread/browser/index.csr.html /app/dist/tasteThread/browser/index.html; fi

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/tasteThread/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]