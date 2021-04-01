import React from 'react';
import axios from 'axios';

import Tournament from './Tournament'
import Tinder from './Tinder';
import Card from './Card';
import Form from './Form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      offset: 0,
      finalists: [],
      finalOffset: 0,
      tourniReady: false,
      isComplete: false,
      hasLocation: false,
      doneWaiting: false,
      round: 1,
    };

    this.getYelpData = this.getYelpData.bind(this);
    this.addToFinalists = this.addToFinalists.bind(this);
    this.checkTourniStatus = this.checkTourniStatus.bind(this);
    this.toggleTourniStatus = this.toggleTourniStatus.bind(this);
    this.pickChoice = this.pickChoice.bind(this);
    this.cutRestaurant = this.cutRestaurant.bind(this);
    this.checkEndRound = this.checkEndRound.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.getNextRestaurant = this.getNextRestaurant.bind(this);
    this.addRestaurant = this.addRestaurant.bind(this);
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          hasLocation: true,
          doneWaiting: true,
        }, () => {
          this.getYelpData(position.coords);
        })
      }, (error) => {
        this.setState({
          doneWaiting: true,
        });
      });
    } else {
      console.log("Geolocation Not Available");
      this.setState({
        doneWaiting: true,
      });
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

  addToFinalists(restaurant) {
    const { finalists } = this.state;

    this.setState((prevState) => ({
      finalists: [...prevState.finalists, restaurant],
    }), () => {
      this.checkTourniStatus();
    });
  }

  checkTourniStatus() {
    const { finalists } = this.state;

    if (finalists.length === 8) {
      this.toggleTourniStatus();
    }
  }

  toggleTourniStatus() {
    this.setState({
      tourniReady: true,
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
    const { finalists, finalOffset } = this.state;

    this.setState((prevState) => ({
      finalists: prevState.finalists.filter((restaurant, i) => i !== index),
    }), () => {
      this.checkEndRound();
    });
  }

  checkEndRound() {
    const { finalists, finalOffset } = this.state;

    if (finalists.length === finalOffset) {
      this.setState((prevState) => ({
        finalOffset: 0,
        round: prevState.round + 1,
      }), () => {
        this.checkFinalistFound();
      })
    }
  }

  checkFinalistFound() {
    const { finalists, finalOffset } = this.state;

    if (finalists.length === 1) {
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

  getNextRestaurant() {
    this.setState((prevState) => ({
      offset: prevState.offset + 1,
    }));
  }

  addRestaurant(restaurant) {
    this.setState((prevState) => ({
      offset: prevState.offset + 1,
    }), () => {
      this.addToFinalists(restaurant);
    });
  }

  render() {
    const { businesses, offset, finalists, finalOffset, tourniReady, isComplete, hasLocation, doneWaiting, round } = this.state;

    if (isComplete) {
      return (
        <div>
          <h1>WINNER WINNER!!</h1>
          <Card
            restaurant={finalists[finalOffset]}
          />
        </div>
      )
    }
    else if (tourniReady) {
      return (
        <Tournament
          finalists={finalists}
          finalOffset={finalOffset}
          pickChoice={this.pickChoice}
          round={round}
        />
      )
    } else if (hasLocation) {
      return (
        <Tinder
          businesses={businesses}
          offset={offset}
          finalists={finalists}
          addToFinalists={this.addToFinalists}
          getNextRestaurant={this.getNextRestaurant}
          addRestaurant={this.addRestaurant}
        />
      )
    } else if (doneWaiting) {
      return (
        <Form
          submitSearch={this.submitSearch}
        />
      )
    } else {
      return (
        <h1>Fetching location...</h1>
      )
    }
  }
}

export default App;