import React from "react";

let Sidebar = require("./Sidebar");

let Client = React.createClass({

  render: function() {
    return (
      <div className="page-container">
        <Sidebar/>
        <div className="route-content pure-u-20-24">
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = Client;
