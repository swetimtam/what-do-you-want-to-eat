import React from 'react';

class RestaurantCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 1,
    };

    this.getNextRestaurant = this.getNextRestaurant.bind(this);
  }

  getNextRestaurant() {
    this.setState((prevState) => ({
      offset: prevState.offset + 1,
    }));
  }

  render() {
    const { businesses } = this.props;
    const { offset } = this.state;

    return (
      <div>
        {businesses[offset] && businesses[offset].name}
        <button
          onClick={this.getNextRestaurant}
        >
        Next
        </button>
      </div>
    )
  }
}

export default RestaurantCard;