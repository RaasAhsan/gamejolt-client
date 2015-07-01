import React from "react";

let classSet = require("react-classset");

let InstalledGame = require('./InstalledGame');

let WebInterface = require("../api/WebInterface");

let InstalledGames = React.createClass({

  getInitialState: function() {
    return {
      installedGames: getInstalledGames()
    };
  },

  render: function() {
    let installed = Object.keys(this.state.installedGames).map((buildId, i) => {
      return (<InstalledGame key={i} game={this.state.installedGames[buildId]}/>);
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
