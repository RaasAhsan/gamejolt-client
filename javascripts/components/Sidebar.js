let React = require("react");

let If = require("./control/If");

let Sidebar = React.createClass({

  getInitialState: function() {
    return {
      showNav: 0
    };
  },

  componentDidMount: function() {
    this.showInterval = setInterval(() => {
      if(this.state.showNav == 6) {
        clearInterval(this.showInterval);
      } else {
        this.setState({showNav: this.state.showNav + 1});
      }
    }, 50);
  },

  render: function() {
    return (
      <div className="sidebar pure-u-4-24">
        <div className="title-nav">
          <img src="images/gj-logo.svg"/>
        </div>
        <If test={this.state.showNav >= 0}>
          <div className="sidebar-nav active-nav">
            <div>
              <i className="ionicons ion-ios-game-controller-b"></i> Discover
            </div>
          </div>
        </If>
        <If test={this.state.showNav >= 1}>
          <div className="sidebar-nav">
            <div>
              <i className="ionicons ion-ios-book"></i> Library
            </div>
          </div>
        </If>
        <div className="subtitle-nav">Browse Games</div>
        <If test={this.state.showNav >= 2}>
          <div className="sidebar-nav">
            <div>
              <i className="ionicons ion-ios-game-controller-b"></i> Hot Games
            </div>
          </div>
        </If>
        <If test={this.state.showNav >= 3}>
          <div className="sidebar-nav">
            <div>
              <i className="ionicons ion-ios-game-controller-b"></i> Featured Games
            </div>
          </div>
        </If>
        <If test={this.state.showNav >= 4}>
          <div className="sidebar-nav">
            <div>
              <i className="ionicons ion-ios-game-controller-b"></i> Top-Rated Games
            </div>
          </div>
        </If>
        <If test={this.state.showNav >= 5}>
          <div className="sidebar-nav">
            <div>
              <i className="ionicons ion-ios-game-controller-b"></i> Newly Added Games
            </div>
          </div>
        </If>
      </div>
    );
  }

});

module.exports = Sidebar;
