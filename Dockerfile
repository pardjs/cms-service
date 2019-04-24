FROM keymetrics/pm2:10-alpine
RUN apk add tzdata
RUN apk add dpkg
ADD repositories /etc/apk/repositories
RUN apk add --update python python-dev gfortran py-pip build-base py-numpy@community
ENV TZ=Asia/Shanghai
ENV NODE_ENV=production
ENV LOG_PATH=/var/logs
RUN ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime
RUN echo ${TZ} > /etc/timezone
RUN npm install yarn -g
RUN npm install typescript -g
RUN mkdir -p /usr/share/pardjs-service
WORKDIR /usr/share/pardjs-service
COPY . /usr/share/pardjs-service
RUN yarn
RUN yarn run build
RUN rm -rf ./src
RUN ls -al
CMD yarn run start:prod