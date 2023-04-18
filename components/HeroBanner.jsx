import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/sanity';
import { SanityImg } from './SanityImg';

export const HeroBanner = ({ data }) => {
  return (
    <div className="hero-banner-container">
      <p className="beats-solo">{data.smallText}</p>
      <h3>{data.midText}</h3>
      <h1>{data.largeText1}</h1>
      <div className="hero-banner-image-container">
        <SanityImg image={data.image} alt="headphones" className="hero-banner-image" />
      </div>

      <div>
        <Link href={`/product/${data.product}`}>
          <button type="button">{data.buttonText}</button>
        </Link>
        <div className="desc">
          <h5>{data.desc}</h5>
        </div>
      </div>
    </div>
  );
};

const banner = {
  texts: {
    sm: '',
    md: '',
    lg: '',
    cta: '',
    description: '',
  },
};

/*
buttonText
: 
"Shop Now"
desc
: 
"Best headphones on the market"
discount
: 
"20% OFF"
image
: 
{_type: 'image', asset: {…}}
largeText1
: 
"FINE"
largeText2
: 
"SMILE"
midText
: 
"Summer Sale"
product
: 
"headphones"
saleTime
: 
"15 Nov to 7 Dec"
smallText
: 
"Beats Solo Air"
_createdAt
: 
"2022-04-09T14:45:31Z"
_id
: 
"3cc34e70-94d3-4e90-946e-e014f3e263fb"
_rev
: 
"BM1A6k1ZxVmyLJbhBzZjkw"
_type
: 
"banner"
_updatedAt
: 
"2022-04-09T14:45:31Z"

*/
