import React from 'react';
import Cardy from './Card';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tournament = ({ finalists, finalOffset, pickChoice, round }) => {
  const business1 = finalists[finalOffset];
  const business2 = finalists[finalOffset + 1];

  if (business2) {
    const categories1 = [];
    const categories2 = [];

    for (let i = 0; i < business1.categories.length; i++) {
      categories1.push(business1.categories[i].title);
    }

    for (let i = 0; i < business2.categories.length; i++) {
      categories2.push(business2.categories[i].title);
    }

    return (
      <div>
        <h1>Tournament: Round {round}</h1>
        <div className="tournament">
          <div>
            <Card>
              <Card.Img
                variant="top"
                src={business1.image_url}
                alt="Card image"
                style={{
                  height: '400px',
                  objectFit: 'cover',
                }}
              />
              <Card.Body>
                <Card.Title>{business1.name}</Card.Title>
                <Card.Subtitle>
                  {`${business1.rating}★ · ${business1.price} · ${(business1.distance / 1609).toFixed(1) + 'mi'}`}
                </Card.Subtitle>
                <Card.Text>
                  {categories1.join(', ')}
                </Card.Text>
                <Card.Text>
                  {`${business1.review_count} reviews`}
                </Card.Text>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    pickChoice(finalOffset + 1);
                  }}
                >
                  SELECT
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div>
            <Card>
              <Card.Img
                variant="top"
                src={business2.image_url}
                alt="Card image"
                style={{
                  height: '400px',
                  objectFit: 'cover',
                }}
              />
              <Card.Body>
                <Card.Title>{business2.name}</Card.Title>
                <Card.Subtitle>
                  {`${business2.rating}★ · ${business2.price} · ${(business2.distance / 1609).toFixed(1) + 'mi'}`}
                </Card.Subtitle>
                <Card.Text>
                  {categories2.join(', ')}
                </Card.Text>
                <Card.Text>
                  {`${business2.review_count} reviews`}
                </Card.Text>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    pickChoice(finalOffset);
                  }}
                >
                  SELECT
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default Tournament;