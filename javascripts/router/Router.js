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

  getRouterMixin() {
    return {
      routeTo: (path, params) => {
        this.routeTo(path, params);
      }
    };
  }

  routeTo(path, params) {
    this.setState({path: path, params: params});
  }

  render() {
    return (
      <this.state.routes[this.state.path] {...this.state.params}/>
    );
  }

}

module.exports = Router;
