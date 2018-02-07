FROM node:8
MAINTAINER grant@fugitivelabs.com

RUN npm install -g forever

ADD / ./server

RUN cd /server && npm rebuild node-sass node-sass-middleware winston-mongodb 
# RUN cd /yote && npm install @google-cloud/logging

EXPOSE 80

CMD forever /server/yote.js