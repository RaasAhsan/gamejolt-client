let React = require("react");

let Sidebar = require("./Sidebar");
let Index = require('./Index');

let Client = React.createClass({

  render: function() {
    return (
      <div className="page-container">
        <Sidebar/>
        <div className="pure-u-20-24">
          <Index/>
        </div>
      </div>
    );
  }

});

module.exports = Client;
