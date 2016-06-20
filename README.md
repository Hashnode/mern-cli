# mern-cli
[![Build Status](https://travis-ci.org/Hashnode/mern-cli.svg?branch=v3.0.0)](https://travis-ci.org/Hashnode/mern-cli)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A CLI for getting started with MERN stack. It offers a [super simple boilerplate project](https://github.com/Hashnode/mern-starter) and additional utilities to get started with isomorphic React and Redux apps.

```
npm install -g mern-cli
```

Available Commands
```
init [name] -t=<variant_name>       Initialize a MERN project (Default variant: mern-starter).
list                                List MERN variants
search [term]                       Search for a MERN variant
info [term]                         View details of a MERN variant
```

Create a new app with default `mern-starter`
```
mern init my_app
```

Install Dependencies
```
cd my_app && npm install
```

## Generators

Generate React components, Express routes and controllers and Mongoose models using mern generator. 

To list out all available generators
```
merng
```

## Help and Version

```
mern -v // Check CLI version
mern --help // Get help and check usage
```

## Roadmap

#### Testing & Deployment

- Commands that make your app ready for production
- Easy testing - React and Node.js
- Deployment options 
	- One click Deploy - `mern deploy`
	- Hashnode's PaaS offering (Experimental)
   - Focus on your MERN app and leave the architecture, Devops etc for us

## License

MERN is released under the [MIT License](http://www.opensource.org/licenses/MIT).