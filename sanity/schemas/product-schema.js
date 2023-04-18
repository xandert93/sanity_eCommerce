/*
🔥 const product = {
  name: 'Banana'
  image: [____],
  description: '',
  features: [____],
  price: 0,
  slug: 
}

Once created on Sanity's DB, the document will also get: {_id, _createdAt, _updatedAt, _rev}
where the last is a "revision marker"

The `type` we give our fields determines how Sanity Studio's desk's document creation UI will look.
For example, if we give a field a { type: 'number' }, on the desk's document creation UI, 
the <input> for adding a value for that field will have increment/decrement operators. 

Similiarly, if we've specified an array of images, we'll see a button for uploading multiple images etc.

In Sanity, type `image` => { _type: 'image', asset: { _ref: 'image_id' } }. We can use its imageId to get 
the actual image using Sanity's "image URL builder"

In Sanity, type `slug` => {_type: 'slug', current: 'slug_value'}. The value is typically
a normalized version of content's `name` value and must be unique. It will then be used
by the client (in the URL) to locate the the document on Sanity e.g. 

if in Sanity studio { name: 'best tV In the world!' }, then when on the slug input, when 
we click `generate`, we'll get { slug: 'best-tv-in-the-world' }. As mentioned, on the document
itself, the the slug's value will be found at `slug.current`. 

See here for validating documents: https://www.sanity.io/docs/validation#basics-4dc8b38bc411

*/

const productSchema = {
  name: 'product',
  title: 'Product', // 🔥 collection name in Sanity Studio
  type: 'document',
  fields: [
    {
      name: 'name', // key in document
      title: 'Name', // input label in Sanity Studio
      type: 'string',
      validation: (Rule) => Rule.required(), // Sanity Studio won't allow publish without this value
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array', // an array...
      of: [{type: 'image'}], // ...of images
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true, // assists in positioning the image
      },
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Try to be concise!', // input helper text in Sanity Studio
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug', // Sanity's type for a unique identifier
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name', // automatically generates a unique slug using product.name
        maxLength: 90, // 90 characters
      },
    },
  ],
}

export default productSchema
