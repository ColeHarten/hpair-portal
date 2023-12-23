import "./product.css";
import React from "react";

interface ProductProps {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    url: string;
}

export default function Product({id, imageUrl, name, price, url}: ProductProps): JSX.Element {
    return (
        <div
            key={id}
            className={"product"}
        >
            <img
                src={imageUrl}
                alt={name}
                className={"image-product"}
            />
            <h3>{name}</h3>
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
}