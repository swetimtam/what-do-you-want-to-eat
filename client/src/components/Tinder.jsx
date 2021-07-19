import React from 'react';
import Card from './Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tinder = ({ businesses, offset, finalists, getNextRestaurant, addRestaurant }) => {
  if (businesses[offset]) {
    return (
      <>
        <h1>These hot local restaurants want you to eat them out!</h1>
        <h1>Tinder Phase: {8 - finalists.length} more</h1>
        <div className="tinder">
          <Card
            restaurant={businesses[offset]}
          />
        </div>
        <Button
          variant="outline-success"
        >
          Like
        </Button>
        <button
          className="btn btn-outline-failure"
          onClick={getNextRestaurant}
        >
          PASS
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => {
            addRestaurant(businesses[offset]);
          }}
        >
          LIKE
        </button>
      </>
    )
  } else {
    return (
      <h1>Fetching restaurants...</h1>
    )
  }
}

export default Tinder;