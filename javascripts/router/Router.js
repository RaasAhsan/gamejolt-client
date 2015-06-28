import React from 'react';

class Router extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: props.routes,
      path: "index",
      params: {}
    };
  }

  getChildContext() {
    return {
      router: {
        routeTo: (path, params) => {
          this.routeTo(path, params);
        },

        currentRoute: () => {
          return this.state.path;
        }
      }
    };
  }

  routeTo(path, params) {
    if(this.state.path != path || this.state.path != params) {
      this.setState({path: path, params: params});
    }
  }

  render() {
    let Handler = this.props.handler;
    let Route = this.state.routes[this.state.path];
    return (
      <Handler>
        <Route {...this.props.params}/>
      </Handler>
    );
  }

}

Router.propTypes = {
  handler: React.PropTypes.func
}

Router.childContextTypes = {
  router: React.PropTypes.object
}

import Link from './RouterLink';
Router.Link = Link;

Router.Navigation = {
  contextTypes: {
    router: React.PropTypes.object
  }
}

module.exports = Router;
