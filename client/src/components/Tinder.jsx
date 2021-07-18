import React from 'react';
import Card from './Card';

const Tinder = ({ businesses, offset, finalists, getNextRestaurant, addRestaurant }) => {
  if (businesses[offset]) {
    return (
      <div>
        <h1>These hot local restaurants want you to eat them out!</h1>
        <h1>Tinder Phase: {8 - finalists.length} more</h1>
        <Card
          restaurant={businesses[offset]}
        />
        <button
          onClick={getNextRestaurant}
        >
          PASS
        </button>
        <button
          onClick={() => {
            addRestaurant(businesses[offset]);
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

export default Tinder;