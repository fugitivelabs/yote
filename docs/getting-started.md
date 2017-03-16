[Docs](./) / Getting Started

Getting Started
========

Let's see how to install Yote, initialize a new project, and get everything running.

## Install Yote
Yote is intended to limit a bunch of boilerplate typing.  You're gonna want the CLI.
```
$ (sudo) npm install -g yote
```
That was easy!

* * * *

## Initializing your project

By default, the Yote CLI will build the super-scaffold when you initialize a new project.

```
$ yote init MyApp
# ... this may take a minute
```

The resulting directory will look like this:

```
MyApp/
  --- server/           
    |_ node_modules     # NPM installed Node modules
    |_ public           # public assets, compiled CSS & JS
    |_ resources        # modularized resource components (more on this later)
    |_ test             # unit tests (coming ... eventually)
    |_ views            # static layout
    ...                 # configuration files + primary middleware
  --- client/           
    |_ global           # global styles, components and utilities
    |_ modules          # modularized resource components (more on this later)
    ...                 # node_module and other configuration files
  --- mobile/          
    |_ MyApp/           # root React Native directory
      |_ __tests__      # ReactNative generated directory
      |_ android        # ReactNative generated Android root
      |_ ios            # ReactNative generated iOS root
      |_ js/            # primary nuts and bolts of the Yote Mobile services
        |_ global       # global styles, components and utilities
        |_ modules      # modularized resource components (more on this later)
      ...               # node modules and other ReactNative generated config files    

```

* * * *

## Running Yote

We test different things at different times, so each stack component runs independently in its own terminal.

**NOTE** All Yote projects come with a default user whose credentials are:
<dl>
  <dt>username:</dt>
  <dd>admin@admin.com</dd>
  <dt>password:</dt>
  <dd>admin</dd>
</dl>


### Run all stack components
To run everything in one command, change directory to `MyApp` and run:

```
$ yote run-everything
```
This will check which services you have built into the stack (server and/or client and/or mobile) and run them all in separate terminals.

A whole bunch of stuff is going to happen.  Afterward, you should have server listening on `http://localhost:3030`, the iOS simulator open and running the Yote login screen, and a browser open to the default Yote landing page.  

### Run individual stack components
Additionally, each stack component can run by itself.  

#### Running the server
In a new terminal, change directory to `MyApp/server` and run:
```
$ yote run-server
```
The server is now listening on `http://localhost:3030` and will recompile with changes.

> Behind the scenes this runs `nodemon` with some configuration flags

**NOTE:** If this throws errors, make sure your have a valid `server/secrets.js` file.   

#### Running the client
In a new terminal, change directory to `MyApp/client` and run:
```
$ yote run-client
```  
This bundles the client in watch mode and will recompile with changes.  

> Behind the scenes this runs webpack in watch & debug mode which bundles all of the Javascript into `MyApp/server/js/bundle.js`  
**NOTE** You'll want to run `$ yote build-client`prior to deployment to minify the bundle

#### Running mobile
In a new terminal, change directory to `MyApp/mobile/MyApp` (slightly redundant...), and run:
```
$ yote run-mobile
```
This will open the iOS simulator to the default login view.
> Behind this scenes this runs `npm start` + `react-native run-ios`.

* * * *

## Now What?
Now that you're up and running, we'll look at [adding a new resource module](/tutorial).

<div><a style="float: left;" href="./">&larr; Previous</a>  <a style="float: right;" href="./tutorial">Next &rarr;</a> </div>
