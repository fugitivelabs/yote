Yote
======

Find Your Road.



To run:
(in separate terminal window) 'mongod'

'npm install'

'nodemon'

(app listens on port 3030)



Docker stuff:
(on remote machine)
1) pull dockerfile/mongodb and dockerfile/redis

2) start redis
"docker run -d --name redis dockerfile/redis"

3) start mongod with flags for smallfiles and local storage
"docker run -d -v ~/data:/data/db --name mongodb dockerfile/mongodb mongod --smallfiles"

4) start yote and link with other containers
"docker run -p 80:3030 -t -i --link redis:redis --link mongodb:mongodb --name yote --rm fugitivelabs/yote"

To update: 
local machine: "docker build -t fugitivelabs/yote .", "docker push fugitivelabs/yote"
server instance: "docker pull fugitivelabs/yote", kill old yote instance, re-run command 4

extras:
run mongo console on mongo image
"docker run -it --rm --link mongodb:mongodb dockerfile/mongodb bash -c 'mongo --host mongodb'"
