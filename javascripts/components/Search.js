import React from "react";

let GameThumbnail = require("./GameThumbnail");
let UserThumbnail = require("./UserThumbnail");

let WebInterface = require("../api/WebInterface");
let search = require("../actions/search");

let Search = React.createClass({

  getInitialState: function() {
    return {
      query: this.props.params.q,
      games: [],
      gamesCount: 0,
      users: [],
      usersCount: 0
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    let query = this.props.params.q;
    if(query != '' && query != prevState.query) {
      this.search(query);
    }
  },

  componentDidMount: function() {
    if(this.state.query != '') {
      this.search(this.state.query);
    }
  },

  search: function(q) {
    new WebInterface().makeRequest(search(this.state.query), (payload) => {
      this.setState({query: q, games: payload.games, gamesCount: payload.gamesCount, users: payload.users, usersCount: payload.usersCount});
    });
  },

  render: function() {
    let games = this.state.games.map((game, i) => <GameThumbnail key={i} game={game}/>);
    let users = this.state.users.map((user, i) => <UserThumbnail key={i} user={user}/>);

    return (
      <div>
        <section className="page-section">
          <div className="section-title">{this.state.gamesCount} games found for '{this.state.query}'</div>
          {games}
        </section>
        <section className="page-section">
          <div className="section-title">{this.state.usersCount} users found for '{this.state.query}'</div>
          {users}
        </section>
      </div>
    );
  }

});

module.exports = Search;
