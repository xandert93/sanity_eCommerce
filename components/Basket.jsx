import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/sanity';
import getStripe from '../lib/getStripe';
import { SanityImg } from './SanityImg';

export const Basket = () => {
  const basketRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    basketItems,
    toggleBasket,
    toggleBasketItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(basketItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="basket-wrapper" ref={basketRef}>
      <div className="basket-container">
        <button type="button" className="basket-heading" onClick={toggleBasket}>
          <AiOutlineLeft />
          <span className="heading">Your Basket</span>
          <span className="basket-num-items">({totalQuantities} items)</span>
        </button>

        {basketItems.length < 1 && (
          <div className="empty-basket">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button type="button" onClick={toggleBasket} className="btn">
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="basket-product-container">
          {basketItems.length >= 1 &&
            basketItems.map((item) => (
              <div className="basket-product" key={item._id}>
                <div className="basket-product-image-container">
                  <SanityImg className="basket-product-image" image={item.images[0]} />
                </div>
                <div className="basket-product-data">
                  <div className="basket-product-data-top">
                    <h5>{item.name}</h5>
                    <h4>£{item.price}</h4>
                  </div>
                  <div className="basket-product-data-bottom">
                    <div className="quantity-adjustor">
                      <button
                        className="minus"
                        onClick={() => toggleBasketItemQuantity(item._id, 'dec')}>
                        <AiOutlineMinus />
                      </button>
                      <span className="num">{item.quantity}</span>
                      <button
                        className="plus"
                        onClick={() => toggleBasketItemQuantity(item._id, 'inc')}>
                        <AiOutlinePlus />
                      </button>
                    </div>
                    <button type="button" className="remove-item" onClick={() => onRemove(item)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {basketItems.length >= 1 && (
          <div className="basket-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>£{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
