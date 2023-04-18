import React from 'react';

import { sanity } from '../lib/sanity';
import { ProductPreview, FooterBanner, HeroBanner } from '../components';

export const getServerSideProps = async (context) => {
  return {
    props: {
      products: await sanity.fetch('*[_type == "product"]'),
      banner: await sanity.fetch('*[_type == "banner"][0]'), // just the first result
    },
  };
};

/*
🔥 pass .fetch a "Sanity query" e.g. * (all) where `_type` is 'product' (like Firebase 😅)

Query cheatsheet here: https://www.sanity.io/docs/query-cheat-sheet

*/

export default function HomePage({ products, banner }) {
  return (
    <div>
      <HeroBanner data={banner} />
      <div className="best-products-heading">
        <h2>Best Sellers</h2>
      </div>

      <div className="product-preview-container">
        {products.map((product) => (
          <ProductPreview key={product._id} {...product} />
        ))}
      </div>

      <FooterBanner data={banner} />
    </div>
  );
}
