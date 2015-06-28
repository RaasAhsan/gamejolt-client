import React from "react";

let classSet = require("react-classset");

let GameThumbnail = require("./GameThumbnail");

let WebInterface = require("../api/WebInterface");
let getGames = require("../actions/getGames");

let HotGames = React.createClass({

  getInitialState: function() {
    return {
      games: [],
    };
  },

  componentDidMount: function() {
    new WebInterface().makeRequest(getGames.hotGames, (payload) => {
      this.setState({games: payload.games});
    });
  },

  render: function() {
    let games = this.state.games.map((game, i) => <GameThumbnail key={i} game={game}/>);

    return (
      <div>
        <section className="page-section">
          <div className="section-title">Hot Games</div>
          <div className="section-description">All the trending games we've got.</div>
          {games}
        </section>
      </div>
    );
  }

});

module.exports = HotGames;
