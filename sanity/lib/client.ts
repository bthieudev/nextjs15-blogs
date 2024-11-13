import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  //Data flow: when user send request for the first time => data => get data but will cache for 60s => even though you update new post you refresh resend new request but you don't see because less than 60s the request will get cache data not the newest data so after 60s you soon as get new data
  // when useCdn set to false the data not be cache
});
