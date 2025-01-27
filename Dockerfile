# Build Stage
FROM node:alpine AS build
COPY package.json /code/
WORKDIR /code/
RUN npm install --force 
COPY ./ /code/
RUN npm run build

# Server Stage.
FROM nginx:1-alpine-slim
COPY --from=build /code/build/ /usr/share/nginx/html/
RUN ln -snf /usr/share/zoneinfo/Asia/Kolkata /etc/localtime && echo "Asia/Kolkata" > /etc/timezone
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./run.sh /run.sh
COPY ./cron_job /etc/crontabs/root
RUN chmod +x /run.sh
ENTRYPOINT ["sh","/run.sh"]