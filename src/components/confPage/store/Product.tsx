import React from 'react';
import "./product.css";

interface ProductProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  url: string;
}

export function Product ({id, imageUrl, name, price, url}: ProductProps) {
  return (
    <div key={id} className={"product"}>
      <img
        src={imageUrl}
        alt={name}
        className={"image-product"}
      />
      <h3>{name}</h3>
      {/* Uncomment the following line if description is not optional */}
      {/* <p>{description}</p> */}
      <span>${price}</span>
      <div>
        <button
          className="snipcart-add-item"
          data-item-id={id}
          data-item-image={imageUrl}
          data-item-name={name}
          data-item-url={url}
          data-item-price={price}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};