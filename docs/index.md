![Howler Logo](https://s3.amazonaws.com/fugitive-labs/yote/Howler-02.png)

Welcome to Yote!
======

Yote is the best super-stack solution out there for any data-driven application.  

```
$ (sudo) npm install -g yote
```



## The Super Stack
****  

> **WTH is a super-stack solution?**  Glad you asked.  A 'super-stack' is a made up term for a solution that provides a web application, native mobile apps, and api services out of the box.

Yote should always be the most comprehensive and flexible stack available. Right now that stack looks like this:

- **Database**
  * [Mongo](http://www.mongodb.org/)
  * [Mongoose](http://mongoosejs.com/)
- **Server/API**
  * [Node](https://nodejs.org/)
  * [Express](http://expressjs.com/)
  * [Passport](http://passportjs.org/)
  * [Docker](https://www.docker.com/)
- **Client**
  * [React](https://reactjs.com/)
  * [React-Router](https://reacttraining.com/react-router/)
  * [Redux](https://redux.js.org/)
- **Mobile**
  * [React Native](http://www.reactnative.com/)
  * [Redux again](https://redux.js.org/)

We're not married to it, however. Yote originally used AngularJS as the client. As our average project complexity grew, we looked for a more performant solution and found it in React/Flux. Then we discovered Redux (which is awesome)... and so on.

If at some point in the future Vue.js or some other new fangled thing proves itself to be better in the wild, we reserve the right to switch things around.  

> We'll do our best to support older versions through the CLI, but ultimately Yote is forward-looking in nature



## Philosophy
****

Yote itself is not a framework. It's not even really a library. Our idea is to simply take the best practices of the best frameworks and services available and package them up together in one place. Yote may change the nuts and bolts from time to time but the general philosophy will remain the same: Yote will always provide client-agnostic services and server-agnostic clients that are **FLEXIBLE**, **EXTENDABLE**, and **PERFORMANT** out of the box.  The overall goal is to help developers roll out production ready super-stack solutions as quickly and painlessly as possible.  




## Prerequisites
****

We assume at least intermediate-level knowledge of Javascript. For the server you'll need to [MondoDB](https://docs.mongodb.com/master/tutorial/install-mongodb-on-os-x/?_ga=1.204328082.326616756.1489430903) installed and running, and [NodeJS >= v6.9.0](https://nodejs.org/en/). For the web client and mobile, it's best to have at least a basic understanding of [ReactJS](https://reactjs.com/) and [Redux](https://redux.js.org/).  
> Redux can be a little tricky to wrap your brain around &mdash; particularly the `reducer` mapping. If you want to simply trust us that it works, you can just follow the patterns and you should pick it up eventually.  


## Basic Usage
****

1. Install the Yote CLI
    ```
    $ (sudo) npm install -g yote
    ```
1. Initialize your project
    ```
    $ yote init MyApp
    # ... this may take a minute
    ```
1. Change directory to `MyApp/server` and start the web server
    ```
    $ cd MyApp/server
    $ yote run-server
    ```
    The Yote server is now listening at `http://localhost:3030` and watching for changes.   
1. In a new terminal, change directory to `MyApp/client` and start the client
    ```
    $ cd MyApp/client
    $ yote run-client
    ```
    This runs the Yote client in watch mode to look for and recompile changes to the `bundle.js`
1. Using a browser, go to `http://localhost:3030` and you'll see "Welcome to Yote!"


## Documentation
****

- [Getting Started](./getting-started)
- [Tutorial](./tutorial)
- [Server](./server/)
  - [Resources](./server/resources)
- [Client](./client/)
- [Mobile](./mobile/)
