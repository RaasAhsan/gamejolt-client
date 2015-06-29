import React from "react";

let classSet = require("react-classset");

let GameThumbnail = require("./GameThumbnail");

let WebInterface = require("../api/WebInterface");

let InstalledGames = React.createClass({
  render: function() {
    return (
      <div>
        <section className="page-section">
          <div className="section-title">Installed Games</div>
        </section>
      </div>
    );
  }

});

module.exports = InstalledGames;
