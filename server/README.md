Yote Server
======

The Yote Server is a Node/Express application server that runs off a Mongo database with a Mongoose ORM. It's built to be a client-agnostic API that's ultimately extendable. Serve static files, build a REST API, link it to a Yote client &mdash; we find it's good for most everything imaginable.

## Table of Contents
****

* [Dependencies](#dependencies)
* [Directory](#directory)
* [Yote.js](#yotejs)
* [Config](#config)
* [Database](#database)
* [Secrets](#secrets)
* [Public](#public)
* [Views](#views)
* [Router](#router)
* [Resources](#resources)



## Dependencies
****

- [NodeJS](https://nodejs.org)
- [ExpressJS](https://expressjs.com)
- [Passport](http://passportjs.org/)
- [Docker](https://www.docker.com/)
- [Mongo](http://www.mongodb.org/)
- [Mongoose](http://mongoosejs.com/)


## Directory
****

The core pieces of the yote `server/` directory are as follows:

```
--- server/           
  |_ public/                      # public assets, compiled CSS & JS
  |_ resources/                   # modularized resource components (more on this later)
  |_ views/                       # static layout
  |_ config.js
  |_ db.js
  |_ secrets.js
  |_ utilities.js
  |_ yote.js   

```
> **NOTE:** there are several other files related to Node, Docker and git that are pretty standard to those services.

Let's go over each piece.



## yote.js
****

Ultimately the Yote server (`yote.js`), is a pretty standard Node/Express application.  As with everything else, we're following best practices here &mdash; at least our humble opinion of best practices.  Regardless, if you're familiar with Express, you should feel right at home with Yote.  

A few things do make it 'Yote' though. Namely out-of-the-box HTTPS support, CORS access to the node APIs, and built in authentication with Passport _and_ API tokens.  



## Config
****

The `server/config.js` file handles setting up Yote for the proper Node environment (by default either `development` or `production`). This is where you tell Yote which port to listen to, whether or not to use SSL, the app's default URL, etc.



## Database
****

Database configuration lives at `server/db.js`.  Every new resource added to Yote will need to be referenced here for the app to register.

```js
//...
// new Mongoose models are defined below
var Post = require('./resources/posts/PostModel');
var Product = require('./resources/products/ProductModel');


```

> **NOTE:** The CLI will do this for you.  



## Secrets
****

Store all private API keys and other secrets in `server/secrets.js`.  This file is intended to allow you to safely use secret api keys in your application without exposing them in publicly.

Stock Yote currently uses three secret keys: two for user session security and one for our email API.

> **NOTE:** We recommend [https://www.random.org/strings/](https://www.random.org/strings/) to generate random session secrets and tokens



## Public
****

Like most servers, Yote will serve static assets (CSS, images, Javascript, etc.) from the `server/public/` directory.  Note much else to note here...



## Views
****

In its current form, the only "View" Yote serves is the index page that sets up the client.  The reason it's here is because it needs to be compiled prior to sending.  



## Router
****

The `server/router/` directory handles two things:  setup any static routing; and configuring the API routes.

### `server-router.js`
`sever-router` runs first and points the application to the `api-router` and establishes paths to static assets.

### `api-router.js`
This is the configuration file for the REST API routes. It also handles token and/or session authentication for any protected routes.  


## Resources
****

Every newly initialized Yote application comes with two resources: products, and users.  

- `users` is a convenient boilerplate resource that nearly every _application_ needs at some point.  Yote users by default conform to the following schema:

  ```js
    var userSchema = mongoose.Schema({
      created:          { type: Date, default: Date.now }
      , updated:        { type: Date, default: Date.now }
      , firstName:      { type: String, required: '{PATH} is required!' }
      , lastName:       { type: String, required: '{PATH} is required!' }
      , username:       {
        type: String
        , required: '{PATH} is required!'
        , unique:true
      }
      //by default, password and reset fields are hidden from db queries. to return them, you must EXPLICITLY request them in the User.find call.
      , password_salt:  { type: String, required: '{PATH} is required!', select: false }
      , password_hash:  { type: String, required: '{PATH} is required!', select: false }
      , roles:          [String]
        //reset password fields
      , resetPasswordTime:    { type: Date, default: Date.now, select: false }
      , resetPasswordHex:     { type: String, default: Math.floor(Math.random()*16777215).toString(16) + Math.floor(Math.random()*16777215).toString(16), select: false }

      //api token fields
      , apiToken:             { type: String, select: false }
      , tokenCreated:         { type: Date, default: Date.now, select: false }
    });
  ```

- The `products` resource is intended to provide a bare-bones example of a fully functioning Yote model.
