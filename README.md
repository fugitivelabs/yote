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


USING HTTPS WITH YOTE
Yote comes out of the box with support for SSL. To use, do the following:
1) generate the necessary files on your local machine. there are plenty of guides online on how to do this. you will need three files, a .key and 2 .crt.
2) create a "ssl" folder in your yote directory and copy these files there.
3) in yote.js, change the 3 lines "key: fs.readFileSync('../projectName/ssl/yourSsl.key')" near the bottom so that "projectName" matches your project folder name and "yourSsl" is the name of your key files. 
4) change te "useHttps" variable to true.
Now, once you run Yote in production mode, it will allow users to connect with https. If you want to force users to ONLY connect with https, change the "httpsOptional" variable to false. (todo: put these vars in the config file)
(important note: update your docker file when you create a new project that uses https. you will need to change the folder from "/yote/*" to your project name)

TO RUN WITH HTTPS IN PRODUCTION INSTANCE
docker run -p 80:80 -p 443:443 -t -i --link redis:redis --link mongodb:mongodb --name NAME -e NODE_ENV=production fugitive
bs/NAME

+
+more new notes (add these to yote at some point):
+view free space on instance
+"df -h"
+remove all unused images from docker (cleared ~3 gigs of disk space, related to problem with daves)
+"sudo docker rmi $(sudo docker images -q -f dangling=true)"
