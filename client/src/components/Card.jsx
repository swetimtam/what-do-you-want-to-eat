import React from 'react';

const Card = ({ restaurant }) => {
  const categories = [];

  for (let i = 0; i < restaurant.categories.length; i++) {
    categories.push(restaurant.categories[i].title);
  }

  return (
    <div className="card">
      <div
        className="card-img"
        style={{ backgroundImage: `url(${restaurant.image_url})` }}
      />
      <p> {restaurant.price} {categories.join(', ') }</p>
      <p>Name: { restaurant.name }</p>
      <p>Rating: { restaurant.rating }</p>
      <p>Ready for { restaurant.transactions.join(', ') || 'dine-in only' }</p>
      <p>Distance: { (restaurant.distance / 1609).toFixed(1) + 'mi' }</p>
    </div>
  )
}

export default Card;