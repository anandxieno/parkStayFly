import client from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

export default client({
  projectId: "x7zm9sph",
  dataset: "production",
  useCdn: true,
  apiVersion: "2022-03-08"
});

const builder = imageUrlBuilder({
  projectId: 'x7zm9sph',
  dataset: 'production',
});

export function urlFor(source) {
  return builder.image(source);
}