# mern-cli
[![Build Status](https://travis-ci.org/Hashnode/mern-cli.svg?branch=master)](https://travis-ci.org/Hashnode/mern-cli)

A cli tool for getting started with MERN

```
npm install -g mern-cli
```


Create a new app
```
mern my_app
```

Install Dependencies
```
cd my_app && npm install
```


## Roadmap

#### Configurations

A configuration file (`.mernrc`) in the project root that tells where to store the generated files.

As of now we are going to generate the following:

-  React Components (Smart, Dumb and StateLess)
-  React Routes
-  MongoDB models
-  Node.js Routes
-  Node.js Controllers

#### Generators

`mern-cli` should be able to generate : 

- React components (smart, dumb, stateless) `mern -g [dumb, stateless, smart] <name>`
- MongoDB models ```mern -g [model] <name>```
- Express routes  ```mern -g [route] <name>```
- React routes ```mern -g [react-route] <name>```
- Interactive Command : ```mern -g [interactive]```  (Will ask what to generate in an interactive mode)
- FullStack command (will generate everything, starting with MongoDB models to React components, routes  etc) - ```mern -g [full-stack]```

#### Testing & Deployment

- Commands that make your app ready for production
- Easy testing - React and Node.js
- Deployment options 
	- One click Deploy - `mern deploy`
	- Hashnode's PaaS offering (Experimental)
   - Focus on your MERN app and leave the architecture, Devops etc for us
