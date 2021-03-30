import React from 'react';

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

    return (
      <div>
        {businesses[offset] && businesses[offset].name}
        <br />
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
  }
}

export default RestaurantCard;