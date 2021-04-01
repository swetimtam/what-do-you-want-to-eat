import React from 'react';
import axios from 'axios';

import Tournament from './Tournament'
import RestaurantCard from './RestaurantCard';
import Card from './Card';
import Form from './Form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      final: [],
      finalOffset: 0,
      isReady: false,
      isComplete: false,
      hasLocation: false,
    };

    this.getYelpData = this.getYelpData.bind(this);
    this.addToFinal = this.addToFinal.bind(this);
    this.checkFinal = this.checkFinal.bind(this);
    this.toggleIsReady = this.toggleIsReady.bind(this);
    this.pickChoice = this.pickChoice.bind(this);
    this.cutRestaurant = this.cutRestaurant.bind(this);
    this.checkEndRound = this.checkEndRound.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('hello');
        this.getYelpData(position.coords);
      }, (error) => {
        console.log(error);
      });
    } else {
      console.log("Geolocation Not Available");
    }
  }

  getYelpData(position) {
    const { longitude, latitude } = position;
    axios('/businesses/search', { params: { longitude, latitude } })
      .then((results) => {
        console.log(results.data);
        this.setState({
          businesses: results.data.businesses,
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
    this.setState({
      isReady: true,
    });
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
      }, () => {
        this.checkFinalistFound();
      })
    }
  }

  checkFinalistFound() {
    const { final, finalOffset } = this.state;

    if (final.length === 1) {
      this.setState({
        isComplete: true,
      })
    }
  }

  submitSearch(location) {
    console.log(location);

    axios('/businesses/search', { params: { location } })
      .then((results) => {
        console.log(results.data);
        this.setState({
          businesses: results.data.businesses,
          hasLocation: true,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { final, finalOffset, isReady, isComplete, hasLocation } = this.state;

    if (isComplete) {
      return (
        <div>
          <h1>WINNER WINNER</h1>
          <Card
            restaurant={final[finalOffset]}
          />
        </div>
      )
    }
    else if (isReady) {
      return (
        <div>
          <Tournament
            final={final}
            finalOffset={finalOffset}
            pickChoice={this.pickChoice}
          />
        </div>
      )
    } else if (hasLocation) {
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
    } else {
      return (
        <Form
           submitSearch={this.submitSearch}
        />
      )
    }
  }
}

export default App;