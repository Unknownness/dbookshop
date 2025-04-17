FROM node:18
WORKDIR /app
COPY . .
RUN npm install && npm run build
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
