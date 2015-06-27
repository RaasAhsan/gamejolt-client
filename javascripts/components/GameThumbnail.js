let React = require("react");

let GameThumbnail = React.createClass({

  propTypes: {

    game: React.PropTypes.object.isRequired

  },

  getInitialState: function() {
    return {
      game: this.props.game
    };
  },

  render: function() {
    return (
      <div className="game-thumbnail pure-u-1-4">
        <img src={this.state.game.img_thumbnail}/>
        <div className="game-title">
          {this.state.game.title}
        </div>
      </div>
    );
  }

});

module.exports = GameThumbnail;
