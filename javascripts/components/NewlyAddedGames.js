import React from "react";

let classSet = require("react-classset");

let GameThumbnail = require("./GameThumbnail");

let WebInterface = require("../api/WebInterface");
let getGames = require("../actions/getGames");

let NewlyAddedGames = React.createClass({

  getInitialState: function() {
    return {
      games: [],
    };
  },

  componentDidMount: function() {
    new WebInterface().makeRequest(getGames.newlyAddedGames, (payload) => {
      this.setState({games: payload.games});
    });
  },

  render: function() {
    let games = this.state.games.map((game, i) => <GameThumbnail key={i} game={game}/>);

    return (
      <div>
        <section className="page-section">
          <div className="section-title">Newly Added Games</div>
          <div className="section-description">Games people have been recently uploading.</div>
          {games}
        </section>
      </div>
    );
  }

});

module.exports = NewlyAddedGames;
