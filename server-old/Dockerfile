FROM node:10
MAINTAINER grant@fugitivelabs.com

RUN npm install -g forever

ADD / ./server

RUN cd /server && npm rebuild node-sass node-sass-middleware winston-mongodb 
# RUN cd /yote && npm install @google-cloud/logging
RUN cd /server && npm install babel-runtime

EXPOSE 80

CMD forever /server/yote.js