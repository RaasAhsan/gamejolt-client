import React from "react";

let classSet = require("react-classset");

let GameThumbnail = require("./GameThumbnail");

let WebInterface = require("../api/WebInterface");
let getGames = require("../actions/getGames");

let FeaturedGames = React.createClass({

  getInitialState: function() {
    return {
      games: [],
    };
  },

  componentDidMount: function() {
    new WebInterface().makeRequest(getGames.featuredGames, (payload) => {
      this.setState({games: payload.games});
    });
  },

  render: function() {
    let games = this.state.games.map((game, i) => <GameThumbnail key={i} game={game}/>);

    return (
      <div>
        <section className="page-section">
          <div className="section-title">All Featured Games</div>
          <div className="section-description">Some of the best games we have around here.</div>
          {games}
        </section>
      </div>
    );
  }

});

module.exports = FeaturedGames;
