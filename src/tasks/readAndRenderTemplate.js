var fs = require('fs');
var ejs = require('ejs');
var settings = require('../../settings');

module.exports = function(blueprint, entityName, ui) {
  
  try {
    var template = fs.readFileSync(settings.PROJECT_DIR +  '/' + settings.BLUEPRINT_DIRECTORY_NAME + "/" + blueprint + '/' + settings.BLUEPRINT_NAME ,  'utf8');
  } catch(e) {
     ui.writeError(blueprint + " is not a valid blueprint name");
     process.exit();
  }
  
  var file = ejs.render(template, {
    name:  entityName,
    capitalName: entityName.charAt(0).toUpperCase() + entityName.slice(1)
  });
  
  return file;
}