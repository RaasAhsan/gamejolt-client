let React = require("react");
let classSet = require("react-classset");

let GameThumbnail = require("./GameThumbnail");

let discover = require("../actions/discoverGames");
let notify = require("../actions/notify");

let Index = React.createClass({

  getInitialState: function() {
    return {
      featuredGames: [{
        game: {
          title: '',
        },
        header_media_item: {
          img_url: ''
        },
        content: ''
      }],
      weeksGames: [],
      hotGames: [],
      bestGames: [],
      selectedFeatured: 0
    };
  },

  componentDidMount: function() {
    discover((payload) => {
      notify("New friend request!", "Agro wants to be friends with you.", () => {
        console.log("go to agro's page");
      });

      this.setState({featuredGames: payload.featuredGames, weeksGames: payload.weeksGames, hotGames: payload.hotGames, bestGames: payload.bestGames});

      this.featuredInterval = setInterval(() => {
        this.setState({selectedFeatured: this.state.selectedFeatured == 9 ? 0 : this.state.selectedFeatured + 1});
      }, 5000);
    });
  },

  selectFeatured: function(i) {
    return () => {
      this.setState({selectedFeatured: i});
    }
  },

  render: function() {
    let weeksGames = this.state.weeksGames.map((game, i) => <GameThumbnail key={i} game={game}/>);
    let hotGames = this.state.hotGames.map((game, i) => <GameThumbnail key={i} game={game}/>);
    let bestGames = this.state.bestGames.map((game, i) => <GameThumbnail key={i} game={game}/>);

    let featuredGames = this.state.featuredGames.map((game, i) => {
      let circleClasses = classSet({
        'featured-select': true,
        'selected': this.state.selectedFeatured == i
      });
      return (<span key={i} className={circleClasses} onClick={this.selectFeatured(i)}></span>);
    });

    let featuredStyle = {
      backgroundImage: 'url(' + this.state.featuredGames[this.state.selectedFeatured].header_media_item.img_url + ')'
    };

    return (
      <div>
        <section className="featured-games" style={featuredStyle}>
          <div className="featured-carousel">
            <div className="featured-selectors">
              {featuredGames}
            </div>
          </div>
          <div className="featured-game-info">
            <div className="featured-name">{this.state.featuredGames[this.state.selectedFeatured].game.title}</div>
            <div className="featured-description">{this.state.featuredGames[this.state.selectedFeatured].content}</div>
          </div>
        </section>
        <section className="page-section">
          <div className="section-title">This Week's Best Games</div>
          <div className="section-description">The highest rated games published in the past 7 days.</div>
          {weeksGames}
        </section>
        <section className="page-section">
          <div className="section-title">Hot Games</div>
          <div className="section-description">Popular indie games, sorted by Hotness.</div>
          {hotGames}
        </section>
        <section className="page-section">
          <div className="section-title">All-Time Best Games</div>
          <div className="section-description">Some of the highest rated games we've got around here.</div>
          {bestGames}
        </section>
      </div>
    );
  }

});

module.exports = Index;
