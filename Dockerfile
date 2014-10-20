FROM debian:sid
MAINTAINER grant@fugitivelabs.com


#update and install dependencies
RUN apt-get update && apt-get install -y nodejs nodejs-legacy npm git

#add app source code
ADD / ./yote
RUN cd /yote && npm install

EXPOSE 80

CMD node /yote/yote.js