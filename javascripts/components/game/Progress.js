import React from 'react';

import If from '../control/If';

let Progress = React.createClass({

  render: function(){
    let progress = null;
    let percentage = this.props.downloads[this.props.build.id];
    if(percentage) {
      progress = {
        width: (percentage * 100) + '%'
      };
    }

    return (
      <If test={progress != null}>
        <div className="game-progress">
          <div className="progress-amount" style={progress}>
          </div>
        </div>
      </If>
    );
  }

});

module.exports = Progress;
