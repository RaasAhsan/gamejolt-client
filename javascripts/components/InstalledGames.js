import React from "react";

let classSet = require("react-classset");

let InstalledGame = require('./InstalledGame');

let WebInterface = require("../api/WebInterface");
let notify = require('../actions/notify');

let InstalledGames = React.createClass({

  getInitialState: function() {
    return {
      installedGames: getInstalledGames()
    };
  },

  uninstallGame: function(buildId){
    return (e) => {
      let games = this.state.installedGames;

      uninstall(buildId,() => {
        notify('Game uninstalled', games[buildId].name + " has been uninstalled.");

        delete games[buildId];
        this.setState({installedGames: games});
      });
    };
  },

  render: function() {
    let installed = Object.keys(this.state.installedGames).map((buildId, i) => {
      return (<InstalledGame key={i} uninstall={this.uninstallGame(buildId)} game={this.state.installedGames[buildId]}/>);
    });

    return (
      <div>
        <section className="page-section">
          <div className="pure-u-16-24">
            <div className="section-title">Installed Games</div>
            {installed}
          </div>
        </section>
      </div>
    );
  }

});

module.exports = InstalledGames;
