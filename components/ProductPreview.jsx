import React from 'react';
import Link from 'next/link';

import { SanityImg } from './SanityImg';

export const ProductPreview = ({ images, name, slug, price }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-preview-card">
          <div className="product-image-container">
            <SanityImg className="product-image" image={images[0]} width={250} height={250} />
          </div>
          <p className="product-name">{name}</p>
          <p className="product-price">£{price}</p>
        </div>
      </Link>
    </div>
  );
};
