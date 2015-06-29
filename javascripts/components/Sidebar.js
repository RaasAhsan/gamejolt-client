import React from "react";

import If from './control/If';

import Router from '../router/Router';
let Link = Router.Link;

import UserControl from './UserControl';

let Sidebar = React.createClass({

  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      showNav: 0,
      onlineUsers: 0
    };
  },

  componentDidMount: function() {
    this.showInterval = setInterval(() => {
      if(this.state.showNav == 10) {
        clearInterval(this.showInterval);
      } else {
        this.setState({showNav: this.state.showNav + 1});
      }
    }, 50);
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.chatInterface) {
      nextProps.chatInterface.onOnlineUsersChanged((count) => {
        this.setState({onlineUsers: count});
      });
    }
  },

  search: function(e){
    let query = this.refs.searchText.getDOMNode().value;

    this.context.router.routeTo('search', {q: query});
  },

  render: function() {
    return (
      <div className="sidebar pure-u-4-24">
        <div className="sidebar-top">
          <div className="title-nav">
            <img src="images/gj-logo.svg"/>
          </div>
          <div className="nav-search">
            <input ref="searchText" onChange={this.search} type="text" placeholder="Search games and users..."/>
          </div>
          <If test={this.state.showNav >= 0}>
            <Link to="index" activeClassName="active-nav" className="sidebar-nav">
              <div>
                <i className="ionicons ion-ios-game-controller-b"></i> Discover
              </div>
            </Link>
          </If>
          <If test={this.state.showNav >= 1}>
            <Link to="library" activeClassName="active-nav" className="sidebar-nav">
              <div>
                <i className="ionicons ion-ios-book"></i> Library
              </div>
            </Link>
          </If>
          <If test={this.state.showNav >= 2}>
            <Link to="installedGames" activeClassName="active-nav" className="sidebar-nav">
              <div>
                <i className="ionicons ion-ios-book"></i> Installed Games
              </div>
            </Link>
          </If>
          <div className="subtitle-nav">Browse Games</div>
          <If test={this.state.showNav >= 3}>
            <Link to="hotGames" activeClassName="active-nav" className="sidebar-nav">
              <div>
                <i className="ionicons ion-ios-game-controller-b"></i> Hot Games
              </div>
            </Link>
          </If>
          <If test={this.state.showNav >= 4}>
            <Link to="featuredGames" activeClassName="active-nav" className="sidebar-nav">
              <div>
                <i className="ionicons ion-ios-game-controller-b"></i> Featured Games
              </div>
            </Link>
          </If>
          <If test={this.state.showNav >= 5}>
            <Link to="topRatedGames" activeClassName="active-nav" className="sidebar-nav">
              <div>
                <i className="ionicons ion-ios-game-controller-b"></i> Top-Rated Games
              </div>
            </Link>
          </If>
          <If test={this.state.showNav >= 6}>
            <Link to="newlyAddedGames" activeClassName="active-nav" className="sidebar-nav">
              <div>
                <i className="ionicons ion-ios-game-controller-b"></i> Newly Added Games
              </div>
            </Link>
          </If>

          <div className="subtitle-nav">Featured Tags</div>

          <If test={this.state.showNav >= 7}>
            <Link to="tag" params={{tag: 'fnaf'}} activeClassName="active-nav" className="sidebar-nav">
              <div>
                <i className="ionicons ion-ios-pricetags"></i> Five Nights at Freddy's
              </div>
            </Link>
          </If>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-bottom-contents">
            <UserControl showNav={this.state.showNav}/>
            <div className="pure-u-8-24 sidebar-stat users-online">
              <i className="ionicons ion-android-people"></i> <span>{this.state.onlineUsers}</span>
            </div>
            <div className="pure-u-8-24 sidebar-stat friend-requests">
              <i className="ionicons ion-android-person-add"></i> <span>{this.props.friendRequests.length}</span>
            </div>
            <div className="pure-u-8-24 sidebar-stat news-notifications">
              <i className="ionicons ion-ios-lightbulb"></i> <span>{this.props.notifications.length}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Sidebar;
