FROM ubuntu
MAINTAINER grant@fugitivelabs.com


#update and install dependencies
RUN apt-get update && apt-get install -y nodejs nodejs-legacy npm git

#TODO: in the (future) yote cli "build" command, set the folder named "yote" to the actual project name.

#add app source code
ADD / ./yote
# only ONE npm module (node-sass) compiles differently on mac vs linux.
#RUN rm -rf /yote/node_modules
# instead of removing all, lets just remove that one
RUN rm -rf /yote/node_modules/node-sass-middleware
RUN cd /yote && npm install

EXPOSE 80

CMD node /yote/yote.js