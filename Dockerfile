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
# so does the winston mongodb module, apparently
RUN rm -rf /yote/node_modules/winston-mongodb
RUN cd /yote && npm install

EXPOSE 80

# install forever and use it to restart node if it crashes
RUN npm install -g forever
CMD forever /yote/yote.js