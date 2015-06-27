let React = require("react");

let Sidebar = require("./Sidebar");
let Index = require('./Index');

let WebInterface = require('../api/WebInterface');
let login = require('../actions/login');
let auth = require('./auth');
let getNotifications = require('../actions/getNotifications');
let getFriendRequests = require('../actions/getFriendRequests');

let Client = React.createClass({

  componentDidMount: function() {
    new WebInterface().makeRequest(login(auth.username, auth.password), (data) => {
      console.log(data);
      this.notifications = setInterval(() => {
        new WebInterface().makeRequest(getFriendRequests, (data) => {
          console.log(JSON.stringify(data));
        });
      }, 10000);
    });
  },

  render: function() {
    return (
      <div className="page-container">
        <Sidebar/>
        <div className="route-content pure-u-20-24">
          <Index/>
        </div>
      </div>
    );
  }

});

module.exports = Client;
