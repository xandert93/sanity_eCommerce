import React from 'react';

import { urlFor } from '../lib/sanity';

export const SanityImg = ({ image, ...props }) => {
  return <img src={urlFor(image)} {...props} />;
};
