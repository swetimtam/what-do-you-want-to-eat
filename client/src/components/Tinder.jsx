import React from 'react';
import Cardy from './Card';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tinder = ({ businesses, offset, finalists, getNextRestaurant, addRestaurant }) => {
  const business = businesses[offset];

  if (business) {
    return (
      <div className="tinder">
        <Alert variant="info">
          Tinder Phase: Like <strong>{8 - finalists.length}</strong> more options
        </Alert>
        <div className="tinder-card">
          <Card>
            <Card.Img
              variant="top"
              src={business.image_url}
              alt="Card image"
            />
            <Card.Body>
              <Card.Title>{business.name}</Card.Title>
              <Card.Subtitle>
                {`${business.categories.map((category) => category.title).join(' · ')} ${business.price ? ' · ' + business.price : ''}`}
              </Card.Subtitle>
              <Card.Text>
                {`${business.rating}★ ${business.review_count} reviews ${(business.distance / 1609).toFixed(1) + 'mi'}`}
                <br />
                <a href={business.url} target="_blank">Yelp</a>
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
        </div>
      </div>
    )
  } else {
    return (
      <Alert variant="warning">
        Finding hot local restaurants near you...
      </Alert>
    )
  }
}

export default Tinder;