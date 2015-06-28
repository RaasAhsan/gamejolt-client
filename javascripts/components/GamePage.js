import React from "react";

let WebInterface = require("../api/WebInterface");

let GamePage = React.createClass({

  render: function() {
    return (
      <div>
        {this.props.params.gameId}
      </div>
    );
  }

});

module.exports = GamePage;
