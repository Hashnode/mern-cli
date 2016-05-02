# mern-cli
[![Build Status](https://travis-ci.org/Hashnode/mern-cli.svg?branch=master)](https://travis-ci.org/Hashnode/mern-cli)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A CLI for getting started with MERN stack. It offers a [super simple boilerplate project](https://github.com/Hashnode/mern-starter) and additional utilities to get started with isomorphic React and Redux apps.

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

```merng dumb <componentname>          	   //Generate a dumb React component```

```merng functional <componentName>   	   //Generate a functional component```

```merng container <componentName	  //Generate a React component and connect to Redux store```

```merng route <routeName>	  	  //Generate an Express route and corresponding controller```

```merng model <modelName>		  //Generate a Mongoose Model```

```merng fullstack <modelName>		  // Generate a dumb component, Express route, controller and Mongoose Model```

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
