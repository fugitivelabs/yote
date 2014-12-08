FROM ubuntu
MAINTAINER grant@fugitivelabs.com


#update and install dependencies
RUN apt-get update && apt-get install -y nodejs nodejs-legacy npm git

#add app source code
ADD / ./yote
RUN rm -rf /yote/node_modules
RUN cd /yote && npm install

EXPOSE 80

CMD node /yote/yote.js