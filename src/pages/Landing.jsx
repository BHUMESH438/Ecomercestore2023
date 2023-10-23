import { FeaturedProducts, Hero } from '../components';
import { customFetch } from '../utils';

const url = '/products?featured=true';
export const loader = async () => {
  const response = await customFetch(url);
  const productdata = response.data.data;
  console.log(productdata);
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
