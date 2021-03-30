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
      isReady: false,
    };

    this.getYelpData = this.getYelpData.bind(this);
    this.addToFinal = this.addToFinal.bind(this);
    this.checkFinal = this.checkFinal.bind(this);
    this.toggleIsReady = this.toggleIsReady.bind(this);
    this.pickFinalist = this.pickFinalist.bind(this);
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

  pickFinalist(index) {
    this.setState((prevState) => ({
      final: prevState.final.filter((restaurant, i) => i !== index),
    }));
  }

  render() {
    const { final, isReady } = this.state;

    if (isReady) {
      return (
        <div>
          <Tournament
            final={final}
            pickFinalist={this.pickFinalist}
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