import React from 'react';
import Card from './Card';

class Tinder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
    };

    this.getNextRestaurant = this.getNextRestaurant.bind(this);
  }

  getNextRestaurant() {
    this.setState((prevState) => ({
      offset: prevState.offset + 1,
    }));
  }

  addRestaurant(restaurant) {
    const { addToFinalists } = this.props;

    this.setState((prevState) => ({
      offset: prevState.offset + 1,
    }), () => {
      addToFinalists(restaurant);
    });
  }

  render() {
    const { businesses, finalists } = this.props;
    const { offset } = this.state;

    if (businesses[offset]) {
      return (
        <div>
          <h1>Tinder Phase: { 8 - finalists.length } more</h1>
          <Card
            restaurant={businesses[offset]}
          />
          <button
            onClick={this.getNextRestaurant}
          >
            PASS
          </button>
          <button
            onClick={() => {
              this.addRestaurant(businesses[offset]);

            }}
          >
            LIKE
          </button>
        </div>
      )
    } else {
      return (
        <h1>Fetching restaurants...</h1>
      )
    }

  }
}

export default Tinder;