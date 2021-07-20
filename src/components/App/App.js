import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [error, setError] = useState(false);
  const [items, setItems] = useState('');

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

  console.log(items);

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      {
        items && 
        <ul>
        {
          items.map((item) => (
            <div className="row product" key={item.pid}>
              <span>{item.name} - {item.price} zł</span>
                <button className="button product__button">Dodaj do koszyka</button>
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
