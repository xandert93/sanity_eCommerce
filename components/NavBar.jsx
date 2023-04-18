import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

import { Basket } from '.';
import { useStateContext } from '../context/StateContext';

export const NavBar = () => {
  const { isBasketOpen, toggleBasket, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Pro Shop</Link>
      </p>

      <button type="button" className="basket-button" onClick={toggleBasket}>
        <AiOutlineShopping />
        <span className="basket-item-quantity">{totalQuantities}</span>
      </button>

      {isBasketOpen && <Basket />}
    </div>
  );
};
