import { Link, useLoaderData } from 'react-router-dom';

const ProductsGrid = () => {
  const { productdata } = useLoaderData();
  console.log(productdata);
  return (
    <>
      <div className='pt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {productdata.map(product => {
          const { title, price, image } = product.attributes;
          return (
            <Link key={product.id} to={`/products/${product.id}`} className='card w-full shadow-xl hover:shadow-2xl trasition duration-300'>
              <figure className='px pt-4'>
                <img src={image} alt={title} className='rounded-xl h-64 md:h-48 w-full object-cover' />
              </figure>
              <div className='card-body items-center text-center'>
                <h2 className='card-title capitalize tracking-wider'>{title}</h2>
                <span className='text-secondary'>{price}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default ProductsGrid;
