import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';

const ProductsGrid = () => {
  // get the loaderdata
  const { productdata } = useLoaderData();
  return (
    <>
      <div className='pt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {productdata.map(product => {
          const { title, price, image } = product.attributes;
          const dolars = formatPrice(price);
          return (
            // use daisy cards
            <Link key={product.id} to={`/products/${product.id}`} className='card w-full shadow-xl hover:shadow-2xl trasition duration-300'>
              {/* card image */}
              <figure className='px pt-4'>
                <img src={image} alt={title} className='rounded-xl h-64 md:h-48 w-full object-cover' />
              </figure>
              {/* card title also inherts shadow from parent */}
              <div className='card-body items-center text-center'>
                <h2 className='card-title capitalize tracking-wider'>{title}</h2>
                <span className='text-secondary'>{dolars}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default ProductsGrid;
