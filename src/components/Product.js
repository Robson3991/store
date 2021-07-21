import React, { useState } from 'react';

export const Product = ({ item, setCart }) => {

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (item) => {

    const itemCopy = {...item};

    if (isAdded.length) {
      alert('produkt został już dodany do koszyka');
      return false;
    }

    if (!!quantity < 1 || isNaN(quantity)) {
      setQuantity(1);
      itemCopy.count = 1;
    } else {
      itemCopy.count = quantity;
    }

    setIsAdded(true);

    setCart(prevState => {
      return [...prevState, itemCopy]
    })
  };

  return(
    <div className="row product">
      <span>{item.name} - {item.price} zł</span>
      <input
        className="product__input"
        type="number" placeholder="podaj ilość"
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        disabled={isAdded}
        value={quantity}
      />
      <button
        className="button"
        onClick={() => handleAddToCart(item)}
        disabled={isAdded}
      >
        Dodaj do koszyka
      </button>
    </div>
  )
}