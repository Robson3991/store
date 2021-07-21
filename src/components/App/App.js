import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Cart } from '../../components/Cart';
import { Product } from '../Product';

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
            <Product
              item={item}
              cart={cart}
              setCart={setCart}
              key={`app-${item.pid}`}
            />
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
