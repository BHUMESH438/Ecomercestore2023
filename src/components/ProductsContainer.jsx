import { useLoaderData } from 'react-router-dom';
import ProductList from './ProductList';
import ProductsGrid from './ProductsGrid';
import { useState } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const totalProducts = meta.pagination.total;
  const [layout, setLayout] = useState('grid');
  // active background
  const setActiveStyles = pattern => {
    return `text-xl btn btn-circle btn-sm ${pattern === layout ? 'btn-primary text-primary-content' : 'btn-ghost text-base-content'}`;
  };
  return (
    <>
      {/* header */}
      <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
        <h4 className='font-medium text-md'>
          {totalProducts} product{totalProducts > 1 && 's'}
        </h4>
        {/* list/grid icons */}
        <div className='flex gap-x-2'>
          <button onClick={() => setLayout('grid')} className={setActiveStyles('grid')}>
            <BsFillGridFill />
          </button>
          <button onClick={() => setLayout('list')} className={setActiveStyles('list')}>
            <BsList />
          </button>
        </div>
      </div>
      {/* Products */}
      <div>{totalProducts === 0 ? <h5 className='text-2xl mt-16'>Sorry, no products matched your search....</h5> : layout === 'grid' ? <ProductsGrid /> : <ProductList />}</div>
    </>
  );
};
export default ProductsContainer;

//seperating the the flex content by space between
//for active content we use the seperate component inside the componenet and give a  state value in the button and while on click compare the state value between the button. for activce class we give the background color
//we fetch the total product data from the loader function compoenent of the react function and if no product give the eror msg,or give the count
//if the layout is grid we give the grid value || we give the list value
