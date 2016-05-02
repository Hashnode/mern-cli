var fileExists = require('../util/fileExists');
var fs = require('fs');

module.exports = function(baseDirectoryMapping, blueprint, file, entityName, ui) {
  if(fileExists(process.cwd() + baseDirectoryMapping[blueprint] + '/' + entityName + '.js')) {
    ui.writeError("File already exists please choose another name.");
    return;
  }
  fs.writeFile(process.cwd() + baseDirectoryMapping[blueprint] + '/' + entityName + '.js',file , function(err) {
      if(err) {
          ui.writeError(err);
      }
      
      else {
          ui.writeInfoLine("Created " + entityName + '.js ' + "in " + process.cwd() + baseDirectoryMapping[blueprint]);
      }
  });  
}