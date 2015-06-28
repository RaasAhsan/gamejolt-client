import React from "react";

let classSet = require("react-classset");

let GameThumbnail = require("./GameThumbnail");

let WebInterface = require("../api/WebInterface");
let getGames = require("../actions/getGames");

let TopRatedGames = React.createClass({

  getInitialState: function() {
    return {
      games: [],
    };
  },

  componentDidMount: function() {
    new WebInterface().makeRequest(getGames.topRatedGames, (payload) => {
      this.setState({games: payload.games});
    });
  },

  render: function() {
    let games = this.state.games.map((game, i) => <GameThumbnail key={i} game={game}/>);

    return (
      <div>
        <section className="page-section">
          <div className="section-title">Top-Rated Games</div>
          <div className="section-description">Some of the highest rated games ever uploaded.</div>
          {games}
        </section>
      </div>
    );
  }

});

module.exports = TopRatedGames;
