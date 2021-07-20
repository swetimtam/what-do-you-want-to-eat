import React from 'react';
import Cardy from './Card';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tinder = ({ businesses, offset, finalists, getNextRestaurant, addRestaurant }) => {
  const business = businesses[offset];

  if (business) {
    const categories = [];

    for (let i = 0; i < business.categories.length; i++) {
      categories.push(business.categories[i].title);
    }

    return (
      <>
        <h1>These hot local restaurants want you to eat them out!</h1>
        <h1>Tinder Phase: {8 - finalists.length} more</h1>
        <Card style={{ width: '400px' }}>
          <Card.Img
            variant="top"
            src={business.image_url}
            alt="Card image"
            style={{
              height: '400px',
              objectFit: 'cover',
            }}
          />
          <Card.Body>
            <Card.Title>{business.name}</Card.Title>
            <Card.Subtitle>
              {`★${business.rating} · ${business.price} · ${(business.distance / 1609).toFixed(1) + 'mi'}`}
            </Card.Subtitle>
            <Card.Text>
              {categories.join(', ')}
              <br />
              {`${business.review_count} reviews`}
            </Card.Text>
            <Button
              variant="outline-danger"
              onClick={getNextRestaurant}
            >
              PASS
            </Button>
            {' '}
            <Button
              variant="outline-success"
              onClick={() => {
                addRestaurant(businesses[offset]);
              }}
            >
              LIKE
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  } else {
    return (
      <h1>Fetching restaurants...</h1>
    )
  }
}

export default Tinder;