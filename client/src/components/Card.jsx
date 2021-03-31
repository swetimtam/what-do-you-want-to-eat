import React from 'react';

const Card = ({ restaurant }) => (
  <div>
    <p>Name: { restaurant.name }</p>
    <p>Price: { restaurant.price }</p>
    <p>Rating: { restaurant.rating }</p>
    <img url={ restaurant.image_url }></img>
  </div>
)

export default Card;