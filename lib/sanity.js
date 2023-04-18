import createSanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanity = createSanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production', // 🔥 in Sanity Manager, refer to "Datasets" tab for this value
  apiVersion: '2022-03-10',
  useCdn: true, //*** didn't explain
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = imageUrlBuilder(sanity);

export const urlFor = (source) => builder.image(source);
