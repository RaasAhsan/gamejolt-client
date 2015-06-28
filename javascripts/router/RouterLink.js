import React from 'react';

import deepcopy  from 'deepcopy';

let RouterLink = React.createClass({

  propTypes: {
    to: React.PropTypes.string.isRequired,
    params: React.PropTypes.object,
    activeClassName: React.PropTypes.string
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  onClick: function(e) {
    this.context.router.routeTo(this.props.to, this.props.params);
  },

  render: function() {
    let childProps = deepcopy(this.props);

    let className = this.props.className;
    if(this.context.router.currentRoute() == this.props.to) {
      className += ` ${this.props.activeClassName}`;
    }

    delete childProps.className;
    delete childProps.activeClassName;
    delete childProps.to;
    delete childProps.params;
    delete childProps.children;

    return (
      <div onClick={this.onClick} className={className} {...childProps}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = RouterLink;
