import React from 'react';
import axios from 'axios';

import Tournament from './Tournament'
import RestaurantCard from './RestaurantCard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      final: [],
      finalOffset: 0,
      isReady: false,
    };

    this.getYelpData = this.getYelpData.bind(this);
    this.addToFinal = this.addToFinal.bind(this);
    this.checkFinal = this.checkFinal.bind(this);
    this.toggleIsReady = this.toggleIsReady.bind(this);
    this.pickChoice = this.pickChoice.bind(this);
    this.cutRestaurant = this.cutRestaurant.bind(this);
    this.checkEndRound = this.checkEndRound.bind(this);
  }

  componentDidMount() {
    this.getYelpData();
  }

  getYelpData() {
    axios('/businesses/search')
      .then((results) => {
        console.log(results.data);
        this.setState({
          businesses: results.data,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addToFinal(restaurant) {
    const { final } = this.state;

    this.setState((prevState) => ({
      final: [...prevState.final, restaurant],
    }), () => {
      this.checkFinal();
    });
  }

  checkFinal() {
    const { final } = this.state;

    if (final.length === 8) {
      this.toggleIsReady();
    }
  }

  toggleIsReady() {
    this.setState((prevState) => ({
      isReady: !prevState.isReady,
    }));
  }

  pickChoice(index) {
    this.setState((prevState) => ({
      finalOffset: prevState.finalOffset + 1,
    }), () => {
      this.cutRestaurant(index);
    });
  }

  cutRestaurant(index) {
    const { final, finalOffset } = this.state;

    this.setState((prevState) => ({
      final: prevState.final.filter((restaurant, i) => i !== index),
    }), () => {
      this.checkEndRound();
    });
  }

  checkEndRound() {
    const { final, finalOffset } = this.state;

    if (final.length === finalOffset) {
      this.setState({
        finalOffset: 0,
      })
    }
  }

  render() {
    const { final, finalOffset, isReady } = this.state;

    if (isReady) {
      return (
        <div>
          <Tournament
            final={final}
            finalOffset={finalOffset}
            pickChoice={this.pickChoice}
          />
        </div>
      )
    } else {
      return (
        <div>
          <RestaurantCard
            businesses={this.state.businesses}
            final={final}
            addToFinal={this.addToFinal}
            toggleIsReady={this.toggleIsReady}
          />
        </div>
      )
    }
  }
}

export default App;