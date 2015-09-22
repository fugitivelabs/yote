FROM node:4.1
MAINTAINER grant@fugitivelabs.com

RUN npm install -g forever

ADD / ./yote

RUN cd /yote && npm install node-sass
RUN cd /yote && npm install node-sass-middleware
RUN cd /yote && npm install winston-mongodb

EXPOSE 80

CMD forever /yote/yote.js