/*
Once we save here, Sanity desk will update to reflect any changes we've made

Sanity looks for us to export schemaTypes=ArrOfSchemas
*/

import productSchema from './product-schema'
import bannerSchema from './banner-schema'

export const schemaTypes = [productSchema, bannerSchema]
