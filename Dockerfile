FROM node:4.1
MAINTAINER grant@fugitivelabs.com

ADD / ./yote

RUN cd /yote && npm install node-sass
RUN cd /yote && npm install node-sass-middleware
RUN cd /yote && npm install winston-mongodb

EXPOSE 80

RUN npm install -g forever
CMD forever /yote/yote.js