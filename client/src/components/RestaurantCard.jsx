import React from 'react';
import Card from './Card';

class RestaurantCard extends React.Component {
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
    const { final, addToFinal, toggleIsReady } = this.props;

    this.setState((prevState) => ({
      offset: prevState.offset + 1,
    }), () => {
      addToFinal(restaurant);
    });
  }

  render() {
    const { businesses } = this.props;
    const { offset } = this.state;

    if (businesses[offset]) {
      return (
        <div>
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
            ADD
          </button>
        </div>
      )
    } else {
      return (
        <div>loading...</div>
      )
    }

  }
}

export default RestaurantCard;