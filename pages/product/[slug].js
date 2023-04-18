import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { sanity } from '../../lib/sanity';
import { ProductPreview, SanityImg } from '../../components';
import { useStateContext } from '../../context/StateContext';

import clsx from 'clsx';
import { useRouter } from 'next/router';

export const getStaticPaths = async () => {
  const products = await sanity.fetch(`*[_type == "product"] { slug { current } }`); // get all products, but specifically only keep slug.current

  return {
    fallback: true,
    paths: products.map(({ slug: { current } }) => ({
      params: { slug: current },
    })),
  };
};

export const getStaticProps = async (context) => {
  const { slug } = context.params;

  const product = await sanity.fetch(`*[_type == "product" && slug.current == '${slug}'][0]`);
  if (!product) return { notFound: true }; // Sanity doesn't throw error if nothing found

  const suggestedProducts = await sanity.fetch('*[_type == "product"]');

  return {
    props: { product, suggestedProducts },
  };
};

export default function ProductPage({ product, suggestedProducts }) {
  const router = useRouter();

  if (router.isFallback) return <h1>Loading product from unknown slug...</h1>;

  const { images, name, description, features, price } = product;

  const { decrementQuantity, incrementQuantity, quantity, onAdd, toggleBasket } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, quantity);
    toggleBasket();
  };

  return (
    <div>
      <div className="product-container">
        <ProductImageDisplay images={images} />

        <div className="product-details">
          <h1>{name}</h1>
          <div className="reviews">
            <div className="product-rating">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <div className="product-description">
            <h4>Description: </h4>
            <p>{description}</p>
          </div>
          <div className="product-features">
            <h4>Features:</h4>
            <ul className="product-feature-list">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <p className="price">£{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-adjustor">
              <button className="minus" onClick={decrementQuantity}>
                <AiOutlineMinus />
              </button>
              <span className="num">{quantity}</span>
              <button className="plus" onClick={incrementQuantity}>
                <AiOutlinePlus />
              </button>
            </p>
          </div>
          <div className="product-actions">
            <button
              type="button"
              className="add-to-basket"
              onClick={() => onAdd(product, quantity)}>
              Add to Basket
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="suggested-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="suggested-products-container track">
            {suggestedProducts.map((product) => (
              <ProductPreview key={product._id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductImageDisplay = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleMouseEnter = (index) => () => setImageIndex(index);

  return (
    <div className="product-images-container">
      <div className="product-image-container">
        <SanityImg image={images[imageIndex]} className="product-image" />
      </div>
      <div className="preview-images-container">
        {images.map((image, index) => {
          const isSelected = imageIndex === index;

          return (
            <SanityImg
              key={index}
              image={image}
              className={clsx('preview-image', isSelected && 'selected-image')}
              onMouseEnter={handleMouseEnter(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

const ProductImagePreview = ({ image }) => {
  return <SanityImg image={image} />;
};
