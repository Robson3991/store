import React from 'react';
import { calculateSummary } from '../helpers/calculateSummary';

export const Cart = ({ cart, setCart }) => {

    const handleChangeProductCount = (id, action) => {
      setCart(prevState => {
        return prevState.map(item => {
          if(id == item.pid) {
            switch(action) {
              case 'add':
                item.count += 1;
                break;
              case 'remove':
                item.count -= 1;
            }
          };
          return item;
        });
      })
    }

    return (
        <div className="cart">
            {
							!cart.length ? 
							(<span>Twój koszyk jest pusty</span>) :
							<>
              <span className="cart__name">koszyk ({cart.map(item => item.count).reduce((sum, count) => sum + count)})</span>
              <div className="cart__items">
                {
                  cart.map(item => (
                    <div className="cart__item" key={item.pid}>
                      <span>{`${item.name} - ${item.price} zł`}</span>
                      <div className="cart__buttons">
                        <button
                          className="button"
                          onClick={() => handleChangeProductCount(item.pid, 'add')}
                          disabled={item.isBlocked || item.max == item.count}
                        >+</button>
                        <span className="cart__count">{item.count}</span>
                        <button
                          className="button"
                          onClick={() => handleChangeProductCount(item.pid, 'remove')}
                          disabled={item.isBlocked || item.min == item.count}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  ))   
                }
                <div className="cart__summary">Podsumowanie: {calculateSummary(cart)}</div>
              </div>
              </>
            }
        </div>
    )
}