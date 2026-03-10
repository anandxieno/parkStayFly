import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from "@sanity/image-url"


export const client = createClient({
  projectId: "x7zm9sph", 
  dataset: 'production',
  apiVersion: '2022-03-08', 
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source : any) {
  return builder.image(source);
}