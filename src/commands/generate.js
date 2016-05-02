var program = require('commander');
var generate = require('../tasks/generate');

//program.description need to be refractored

program
.description('Generate components, routes, controllers, models using mern generator\n\n  merng dumb <componentname>\n  merng functional <componentName>\n  merng container <componentName>\n  merng route <routeName>\n  merng model <modelName>\n  merng fullstack <modelName>\n')
.action(function() {
  new generate().run(program.args);
})
.parse(process.argv);

if(!program.args.length) {
  program.help();
}