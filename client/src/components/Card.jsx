import React from 'react';

const Card = ({ restaurant }) => (
  <div>
    <p>Name: { restaurant.name }</p>
    <p>Price: { restaurant.price }</p>
    <p>Rating: { restaurant.rating }</p>
    <div
      className="card-img"
      style={{ backgroundImage: `url(${restaurant.image_url})` }}
    >
    </div>
  </div>
)

export default Card;