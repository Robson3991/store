import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Cart } from '../../components/Cart';

const App = () => {
  const [error, setError] = useState(false);
  const [items, setItems] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const getData = await axios.get('/api/cart')
        setItems(getData.data);
      } catch(error) {
        setError(true);
      }
    }
    fetch();
  }, []);

  const handleAddToCart = (item) => {
    const isAdded = [...cart].filter(product => product.pid === item.pid);

    if (isAdded.length) {
      alert('produkt został już dodany do koszyka');
      return false;
    }

    item.count = 1;

    setCart(prevState => {
      return [...prevState, item]
    })
  };

  if (error) return <div className="container">
    <p>Nie udało się pobrać danych</p>
  </div>

  return (
    <div className="container">
      <header className="header">
        <h3>Lista produktów</h3>
        <Cart cart={cart} setCart={setCart} />
      </header>
      {
        items && 
        <ul>
        {
          items.map((item) => (
            <div className="row product" key={item.pid}>
              <span>{item.name} - {item.price} zł</span>
                <button
                  className="button product__button"
                  onClick={() => handleAddToCart(item)}
                >
                  Dodaj do koszyka
                </button>
            </div>
          ))
        }
      </ul>
      }
    </div>
  );
};

export {
    App
};
