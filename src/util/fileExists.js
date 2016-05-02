var fs = require('fs');

module.exports = function(path) {
  try {
      fs.accessSync(path, fs.F_OK);
      return true;
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    } else {
      throw e;
    }    
  }

}