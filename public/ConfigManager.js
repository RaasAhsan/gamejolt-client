var jsonfile = require('jsonfile');
var fs = require('fs');

var configFile = process.env.HOME + '/.gamejolt/data.json';

module.exports = {

  getConfig: function(){
    return jsonfile.readFileSync(configFile);
  },

  saveConfig: function(data){
    jsonfile.writeFileSync(configFile, data);
  },

  addInstalledGame: function(buildId, installData){
    var config = getConfig();
    config[buildId] = installData;

    saveConfig(config)
  }

}
