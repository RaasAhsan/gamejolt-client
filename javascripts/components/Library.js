import React from "react";

let GameThumbnail = require("./GameThumbnail");

let WebInterface = require("../api/WebInterface");
let getFollowedGames = require("../actions/getFollowedGames");
let getDeveloperGames = require("../actions/getDeveloperGames");

let Library = React.createClass({

  getInitialState: function() {
    return {
      followedGames: [],
      developerGames: []
    };
  },

  componentDidMount: function() {
    new WebInterface().makeRequest(getFollowedGames(68073), (p1) => {
      new WebInterface().makeRequest(getDeveloperGames(68073), (p2) => {
        this.setState({followedGames: p1.games, developerGames: p2.games});
      });
    });
  },

  render: function() {
    let followedGames = this.state.followedGames.map((game, i) => <GameThumbnail key={i} game={game}/>);
    let developerGames = this.state.developerGames.map((game, i) => <GameThumbnail key={i} game={game}/>);

    return (
      <div>
        <section className="page-section">
          <div className="section-title">Followed Games</div>
          <div className="section-description">A list of you follow and love.</div>
          {followedGames}
        </section>
        <section className="page-section">
          <div className="section-title">Your games</div>
          <div className="section-description">A list games you made with love.</div>
          {developerGames}
        </section>
      </div>
    );
  }

});

module.exports = Library;
