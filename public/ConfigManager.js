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
    var config = this.getConfig();
    config.installedGames[buildId] = installData;

    this.saveConfig(config);
  },

  uninstallGame: function(buildId){
    var config = this.getConfig();
    delete config.installedGames[buildId];

    this.saveConfig(config);
  }

}
