Yote
======

Find Your Road.


todo: improve readme


TO RUN:
(in separate terminal window) 'mongod'
'npm install'
'nodemon'


DEVELOPMENT vs PRODUCTION
development is the default environment. it listens on port 3030 and console.log logs to the console. it can be run with the command "nodemon" from the top level directory.
production environment can be enabled by running "NODE_ENV=production PORT=xxxx node yote.js", where xxxx is your desired port (like 80 on a production server). The PORT=xxxx call is not necessary; it will default to 80, but this will break if that port is already in use. Running production will disable all console.log calls on the front end, which is really f-ing cool.

DOCKER DEPLOYMENT
deployment to a remote instance is easy. it requires running containers for redis and mongodb. on your local machine, run "docker built -t ORG_NAME/PROJECT_NAME .", then "docker push ORG_NAME/PROJECT_NAME". on the remote instance, run "docker pull ORG_NAME/PROJECT_NAME", then:

"docker run -p 80:3030 -t -i --link redis:redis --link mongodb:mongodb --name yote --rm ORG_NAME/PROJECT_NAME"

to run the image and link it. more details later.



1) pull dockerfile/mongodb and dockerfile/redis
2) start redis
"docker run -d --name redis dockerfile/redis"
3) start mongod with flags for smallfiles and local storage
"docker run -d -v ~/data:/data/db --name mongodb dockerfile/mongodb mongod --smallfiles"
//in future, change "~/data" to "~/mongo/data". for time being, changing this will cause loss of old data.
4) start yote and link with other containers
"docker run -p 80:3030 -t -i --link redis:redis --link mongodb:mongodb --name yote --rm fugitivelabs/yote"

extras:
run mongo console on mongo image
"docker run -it --rm --link mongodb:mongodb dockerfile/mongodb bash -c 'mongo --host mongodb'"
