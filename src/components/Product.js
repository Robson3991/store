import React, { useState } from 'react';
import axios from 'axios';

export const Product = ({ item, setCart }) => {

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async (item) => {

    const itemCopy = {...item};

    if (isAdded) {
      alert('produkt został już dodany do koszyka');
      return false;
    }
    
    if (!!quantity < 1 || isNaN(quantity)) {
      setQuantity(1);
      itemCopy.count = 1;
    } else {
      itemCopy.count = quantity;
    }

    try {
      await axios.post('/api/product/check', {
        "pid": itemCopy.pid,
        "quantity": itemCopy.count
      });
    } catch(error) {
      alert('Przekroczono limit');
      itemCopy.count = itemCopy.min;
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