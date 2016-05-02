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

## Generators

Generate React components, Express routes and controllers and Mongoose models using mern generator. 

```merng dumb <componentname>          	   //Generate a dumb react component```

```merng functional <componentName>   	   //Generate a functional component```

```merng container <componentName	  //Generate a react component and connect to redux store```

```merng route <routeName>	  	  //Generate a Node.js route```

```merng model <modelName>		  //Generate a Mongoose Model```

```merng fullstack <modelName>		  // Generate a dumb component, Node.js route, Nodejs controller, Mongoose Model```

## Help and Version

```
mern -v // Check CLI version
merng --help // Get help and check usage
```

## Roadmap

#### Testing & Deployment

- Commands that make your app ready for production
- Easy testing - React and Node.js
- Deployment options 
	- One click Deploy - `mern deploy`
	- Hashnode's PaaS offering (Experimental)
   - Focus on your MERN app and leave the architecture, Devops etc for us
