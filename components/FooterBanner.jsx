import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/sanity';
import { SanityImg } from './SanityImg';

export const FooterBanner = ({ data }) => {
  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  } = data;

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <div className="footer-banner-image-container">
          <SanityImg image={image} className="footer-banner-image" />
        </div>
      </div>
    </div>
  );
};
