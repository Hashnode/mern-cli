var fs = require('fs');
var ejs = require('ejs');
var writeFile = require('writefile');
var settings = require('../../settings');
var UI = require('../ui/ui');
var fileExists = require('../util/fileExists');
var isComponent = require('../util/isComponent');
var checkAndWrite = require('./checkAndWrite');
var readAndRenderTempate = require('./readAndRenderTemplate');

function generate() {
  this.ui = new UI({});
}

generate.prototype.run = function(args) {
  if(args.length < 3) {
    return this.ui.writeError("Please pass relevent number of arguments");
  }
  
  var blueprint = args[0], entityName = args[1], baseDirectoryMapping, upperCaseEntityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
  
  try {
      baseDirectoryMapping = require(process.cwd() + '/' + settings.CONFIG_FILE_NAME);
  } catch (e) {
      return this.ui.writeError("Make sure your are in root directory of your mern boilerplate.");
  }
  
  if(isComponent(blueprint)) {
    if(fileExists(process.cwd() + baseDirectoryMapping[blueprint] + '/' + upperCaseEntityName + '/' + upperCaseEntityName + '.jsx')) {
      this.ui.writeError("File already exists please choose another name.");
      return;
    }
    
    writeFile(process.cwd() + baseDirectoryMapping[blueprint] + '/' + upperCaseEntityName + '/' + upperCaseEntityName + '.jsx', readAndRenderTempate(blueprint, entityName, this.ui), function(err) {
        if(err) {
            this.ui.writeError(err);
        }
        
        else {
            this.ui.writeInfoLine("Created " + upperCaseEntityName + '.jsx ' + "in " + process.cwd() + baseDirectoryMapping[blueprint] + '/' + upperCaseEntityName);
        }
    }.bind(this));  
  }
  
  else if(blueprint === 'route') {
      
      checkAndWrite(baseDirectoryMapping, 'route', readAndRenderTempate('route', entityName, this.ui), entityName + '.routes', this.ui);
      checkAndWrite(baseDirectoryMapping, 'controller', readAndRenderTempate('controller', entityName, this.ui), entityName + '.controller', this.ui);
      
  }
  
  else if(blueprint === 'fullstack') {
    checkAndWrite(baseDirectoryMapping, 'route', readAndRenderTempate('route', entityName, this.ui), entityName + '.routes', this.ui);
    checkAndWrite(baseDirectoryMapping, 'controller', readAndRenderTempate('controller', entityName, this.ui), entityName + '.controller', this.ui);
    checkAndWrite(baseDirectoryMapping, 'model', readAndRenderTempate('model', entityName, this.ui), entityName, this.ui);
    
    if(fileExists(process.cwd() + baseDirectoryMapping['dumb'] + '/' + upperCaseEntityName + '/' + upperCaseEntityName + '.jsx')) {
      this.ui.writeError("File already exists please choose another name.");
      return;
    }
    
    writeFile(process.cwd() + baseDirectoryMapping['dumb'] + '/' + upperCaseEntityName + '/' + upperCaseEntityName + '.jsx', readAndRenderTempate('dumb', entityName, this.ui), function(err) {
        if(err) {
            this.ui.writeError(err);
        }
        
        else {
            this.ui.writeInfoLine("Created " + upperCaseEntityName + '.jsx ' + "in " + process.cwd() + baseDirectoryMapping['dumb'] + '/' + upperCaseEntityName);
        }
    }.bind(this));  
  }
  
  else {
      checkAndWrite(baseDirectoryMapping, blueprint, readAndRenderTempate(blueprint, entityName, this.ui), entityName, this.ui);
  }
 
}

module.exports = generate;