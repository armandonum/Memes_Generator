FROM node:16-alpine AS build


WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build


FROM nginx:1.21-alpine
COPY --from=build /app/dist /usr/share/nginx/html

docker run -p 8080:80 meme-generator.
EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
