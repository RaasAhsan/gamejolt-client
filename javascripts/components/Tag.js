import React from "react";

let GameThumbnail = require("./GameThumbnail");

let WebInterface = require("../api/WebInterface");
let getTaggedGames = require("../actions/getTaggedGames");

let Tag = React.createClass({

  getInitialState: function() {
    return {
      taggedGames: [],
      totalGamesCount: 0
    };
  },

  componentDidMount: function() {
    new WebInterface().makeRequest(getTaggedGames(this.props.params.tag), (payload) => {
      this.setState({taggedGames: payload.games, taggedCount: payload.totalGamesCount});
    });
  },

  render: function() {
    let taggedGames = this.state.taggedGames.map((game, i) => <GameThumbnail key={i} game={game}/>);

    return (
      <div>
        <section className="page-section">
          <div className="section-title">{this.state.taggedCount} games</div>
          <div className="section-description">A list of #{this.props.params.tag} games. {this.state.taggedCount} of them.</div>
          {taggedGames}
        </section>
      </div>
    );
  }

});

module.exports = Tag;
