import React from 'react';

const Card = ({ restaurant }) => (
  <div>
    <div
      className="card-img"
      style={{ backgroundImage: `url(${restaurant.image_url})` }}
    />
    <p>Name: { restaurant.name }</p>
    <p>Rating: { restaurant.rating }</p>
    <p>Price: { restaurant.price }</p>
  </div>
)

export default Card;