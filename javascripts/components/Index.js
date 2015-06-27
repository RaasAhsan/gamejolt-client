let React = require("react");

let Index = React.createClass({

  getInitialState: function() {
    return {
      position: 1
    };
  },

  componentDidMount: function() {
    this.carouselMove = setInterval(() => {
      this.setState({position: this.state.position == 6 ? 0 : this.state.position + 1});
    }, 5000);
  },

  render: function() {
    let carouselClasses = 'carousel on-featured-' + this.state.position;

    return (
      <div>
        <section className="featured-carousel">
          <div className="title">Featured games - All the coolest games</div>
          <div className="container">
            <div className={carouselClasses}>
              <div className="featured-game featured-1"></div>
              <div className="featured-game featured-2"></div>
              <div className="featured-game featured-3"></div>
              <div className="featured-game featured-4"></div>
              <div className="featured-game featured-5"></div>
              <div className="featured-game featured-6"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }

});

module.exports = Index;
