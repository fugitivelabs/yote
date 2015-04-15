Yote
======

Find Your Road.

# Formatted README below

_NOTE: Grant needs to review and bring in some other things regarding https_

Yote
======

A simple client agnostic API framework for NodeJS. 

## Dependencies 
- [NodeJS version >= 0.10.33](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)
- [Redis](http://redis.io/)  -- (session storage)
- [MongoDB](http://www.mongodb.org/)
- [ExpressJS 4](http://expressjs.com/)
- [AngularJS](https://angularjs.org/)  -- (default web client)
- [Docker](https://www.docker.com/) -- Deployment containers

## Running Locally

To run the application locally: 

1. Install all dependencies and run both mongo and redis. 
2. Clone the github repo and cd into the directory. 
3. Run ``` $ npm install``` to install the application's node dependencies (npm is installed alongside node).
4. Locate and copy the **secrets.js** file into the top level directory for the project. 
  * This file contains the randomized session keys as well the application API keys, and is not tracked by Github. 
5. Locate and copy **ssl** folder into the top level directory for the project 
  * This contains the necessary keys for implementing https connections. (These files will be provided to you securely outside of the Github repo). 

Your folder structure should look something like this:
```
 ppd-gsk-registry/
     node_modules/
     public/
     server/
     ssl/
     secrets.js
     yote.js
    
``` 
Finally, to run the application, run ``` $ node yote.js ```. The server will be listening on [http://localhost:3030/](http://localhost:3030/) in your browser of choice.

## Database Access 
#### Local access 
In your terminal simply run ``` $ mongo ``` to use the built in mongo console. 

#### Remote access 
On the remote instance, you can access the database by running a new mongo container and connecting to the already running database container. In the current deployment, this command would be: 
```
$ (sudo) docker run -it --rm --link mongodb:mongodb dockerfile/mongodb bash -c 'mongo --host mongodb'

```


## TO RUN WITH SSL IN PRODUCTION INSTANCE
```
$ (sudo) docker run -p 80:80 -p 443:443 -t -i --link redis:redis --link mongodb:mongodb --name gsk-registry -rm -e NODE_ENV=production fugitivelabs/gsk-registry

``` 


## DEVELOPMENT vs PRODUCTION Environments 
#### Development 
**Development** is the default environment. It listens on port 3030 and ```console.log()``` logs to the console. It can be run locally with the command ```$ nodemon``` or ```$ node yote.js``` from the top level directory.

To run development environment remotely use the following command:
```
 $ (sudo) docker run -p 80:3030 -t -i --link redis:redis --link mongodb:mongodb --name PROJECT_NAME --rm ORG_NAME/PROJECT_NAME
```

#### Production
A **production** environment can be enabled by running ```NODE_ENV=production PORT=xxxx node yote.js```, where _xxxx_ is your desired port (like 80 on a production server). The _PORT=xxxx_ call is not necessary; it will default to 80, but this will break if that port is already in use. Running production will disable all console.log calls on the front end.

To run a production environment remotely use the following command: 
```
$ (sudo) docker run -p 80:3030 -p 443:443 -t -i --link redis:redis --link mongodb:mongodb --name PROJECT_NAME -rm -e NODE_ENV=production ORG_NAME/PROJECT_NAME
```

## Remote Deployment 
Deployment to a remote instance is easy. It requires running docker containers for Redis and MongoDB. See [docker docs](https://www.docker.com/) for more info on setting up your local docker environment.

First we need to build and push our local application to your docker instance.
#### Build and Push new instance from local machine  
On your local machine, run:
``` 
$ docker built -t ORG_NAME/PROJECT_NAME
```
Then: 
```
$ docker push ORG_NAME/PROJECT_NAME 
``` 
Then, we need to initialize our remote instance.

#### Initialize Remote Instance 

On the remote server, run the following images and link them.

1. Pull the Mongo and Redis repositories from Docker itself: 
  * ``` $ (sudo) docker pull dockerfile/mongo and dockerfild/redis ```
2. Start Redis
  * ``` $ (sudo) docker run -d --name redis dockerfile/redis ```
3. Start mongod with flags for smallfiles and local storage
  * ``` $ (sudo) docker run -d -v ~/data:/data/db --name mongodb dockerfile/mongodb mongod --smallfiles ```
4. Start yote and link with other containers
  * ``` $ (sudo) docker run -p 80:3030 -t -i --link redis:redis --link mongodb:mongodb --name PROJECT_NAME --rm ORG_NAME/PROJECT_NAME ```

Note that **PROJECT_NAME** above should be replaced with the project name 

#### New Deployments

Repeat steps above to build and push changes to docker from your local machine. 

#### Update instance from remote server
On the remote instance we need to pull in the new build, stop and remove the running docker application instance, and then rerun the new build. 

Run: 
```
$ (sudo) docker ps
```
Note the **CONTAINER ID** of the container running the application 

Next run:

```
$ (sudo) docker pull ORG_NAME/PROJECT_NAME
```

Then _stop_ the running application container:

``` 
$ (sudo) docker stop [CONTAINER ID]

```
Next _remove_ the running application container: 

```
$ (sudo) docker rm [CONTAINER ID]
```

Now, simply rerun the application and Docker will use the most recently pulled in container instance. 

```
$ (sudo) docker run -p 80:3030 -t -i --link redis:redis --link mongodb:mongodb --name yote --rm ORG_NAME/PROJECT_NAME
```


## Extras

#### View free space on instance

``` $ df -h ```

#### Remove all unused images from docker 
Docker instances will build up, taking up memory on the server.  To clear run: 
```
$ (sudo) docker rmi $(sudo docker images -q -f dangling=true)
```

#Grant's notes:

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

SENDING EMAILS
to send emails, use the "utilities" controller. an example of its use is users controller "requestPasswordReset" method. if you do not have a mandrill api key, the call will still return but will not send an email.

+
+more new notes (add these to yote at some point):
+view free space on instance
+"df -h"
+remove all unused images from docker (cleared ~3 gigs of disk space, related to problem with daves)
+"sudo docker rmi $(sudo docker images -q -f dangling=true)"

