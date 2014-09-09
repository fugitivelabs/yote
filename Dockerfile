FROM debian:sid
MAINTAINER grant@fugitivelabs.com

#add sources for mongo
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

#add mongo repo to apt-get
RUN echo 'deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list

#update and install dependencies
RUN apt-get update && apt-get install -y nodejs npm git supervisor mongodb-org

#create directories for mongodb and supervisor logs
RUN mkdir -p /data/db
RUN mkdir -p /var/log/supervisor

#add app source code
ADD / ./coyote
RUN cd /coyote && npm install

# is better to install in /var/www/? /coyote/ is way cooler.

COPY supervisord.conf /etc/supervisor/conf.d/supervisord-nodejs.conf

EXPOSE 80

CMD ["/usr/bin/supervisord"]