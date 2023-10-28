import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';

const ProductList = () => {
  // get the loaderdata
  const { productdata } = useLoaderData();
  return (
    <>
      <div className='pt-2 grid gap-y-4'>
        {productdata.map(product => {
          const { title, price, image, company } = product.attributes;
          const dolars = formatPrice(price);
          return (
            <Link key={product.id} to={`/products/${product.id}`} className='p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'>
              {/*image */}
              <img src={image} alt={title} className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300' />
              {/* content */}
              <div className='ml-0 sm:ml-16'>
                <h3 className='capitalize font-medium text-lg'>{title}</h3>
                <h4 className='capitalize text-md text-neutral-content'>{company}</h4>
              </div>
              <p className='font-medium ml-0 sm:ml-auto text-lg'>{dolars}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default ProductList;

//for list outerlayer is grid, inner layer is flex and flex wrap and min-width 640px - flex row and below that flex col and gap should be given for both grid and flex

//we form the group and group hover for hovering the whole flex component and the image used in that
