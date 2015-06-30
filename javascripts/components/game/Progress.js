import React from 'react';

import If from '../control/If';

let Progress = React.createClass({

  render: function(){
    let progress = {
      width: this.props.progress + '%'
    };

    return (
      <If test={this.props.progress != null}>
        <div className="game-progress">
          <div className="progress-amount" style={progress}>
          </div>
        </div>
      </If>
    );
  }

});

module.exports = Progress;
