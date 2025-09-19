FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build:prod

RUN if [ -f /app/dist/cook/browser/index.csr.html ]; then mv /app/dist/cook/browser/index.csr.html /app/dist/cook/browser/index.html; fi

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/cook/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]