FROM node:14-alpine as builder

ENV PORT=80

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build:prod

FROM nginx:1.19-alpine

COPY --from=builder /app/dist/abcc /usr/share/nginx/html

COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE $PORT

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && cat /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
