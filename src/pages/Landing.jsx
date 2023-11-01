import { FeaturedProducts, Hero } from '../components';
import { customFetch } from '../utils';

const url = '/products?featured=true';

//query objects
const featuredProductsQuery = {
  queryKey: ['featuredProduct'],
  queryFn: () => customFetch(url)
};

// we use the loader at the parent componenet and the loader data can be used within the any child cmopoenent
export const loader = queryClient => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const productdata = response.data.data;
  return { productdata };
};
const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};
export default Landing;

//this url gives only 3 images and the url in products page gives all product images and detail. so the url used in the lamding page and the productpage are differnt
