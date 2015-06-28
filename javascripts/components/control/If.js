import React from "react";

let If = React.createClass({
  propTypes: {
    test: React.PropTypes.bool.isRequired
  },
  render: function(){
    return this.props.test ? this.props.children : <span></span>;
  }
});

module.exports = If;
