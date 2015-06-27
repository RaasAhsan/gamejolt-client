var React = require('react');

var If = React.createClass({
  propTypes: {
    test: React.PropTypes.bool.isRequired
  },
  render: function(){
    return this.props.test ? this.props.children : <span></span>;
  }
});

module.exports = If;
