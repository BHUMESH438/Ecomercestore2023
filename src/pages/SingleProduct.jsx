import { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { customFetch, formatPrice, genrateAmount } from '../utils';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/CartSlice';

export const loader = async ({ params }) => {
  const res = await customFetch(`/products/${params.id}`);
  const singleproductdata = res.data.data;
  return singleproductdata;
};
const SingleProduct = () => {
  const singleproductdata = useLoaderData();
  const { image, title, price, description, colors, company } = singleproductdata.attributes;
  const formattedPrice = formatPrice(price);

  const [productClolor, setProductClolor] = useState([0]);

  const [amount, setAmount] = useState(1);
  const handleAmount = e => {
    setAmount(parseInt(e.target.value)); //input val is text from the client convert it to number
  };
  const dispatch = useDispatch();
  //we combine the product id + productcolor to have seperate productid even if the product has same id -> so we can differentiate by using the different product color string+id
  const cartProduct = {
    cartID: singleproductdata.id + productClolor,
    productID: singleproductdata.id,
    image,
    title,
    price,
    amount,
    productClolor,
    company
  };
  //passing/dispatching the actions
  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };
  return (
    <section>
      {/* breadcrumbs div */}
      <div className='text-md breadcrumbs'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </div>
      {/* product grid - two col for img and details */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* image */}
        <img src={image} alt={title} className='w-96 h-96 object-cover rounded-lg lg:w-full' />
        {/* product info */}
        <div>
          <h1 className='capitalize text-3xl font-bold'>{title}</h1>
          <h4 className='text-xl text-neutral-content font-bold mt-2'>{company}</h4>
          <p className='mt-3 text-xl'>{formattedPrice}</p>
          <p className='mt-6 leading-8'>{description}</p>
          {/* colors - set inside the single col of grid*/}
          <div className='mt-6'>
            <h4 className='text-md font-medium tracking-wider capitalize'>colors</h4>
            <div className='mt-2'>
              {colors.map(color => {
                return <button key={color} type='button' className={`badge w-6 h-6 mr-2 ${color === productClolor && 'border-2 border-secondary'}`} style={{ backgroundColor: color }} onClick={() => setProductClolor(color)}></button>;
              })}
            </div>
          </div>
          {/* quantity-daisy ui formcontrol select */}
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <h4 className='text-md font-medium tracking-wider capitalize'>amount</h4>
            </label>
            <select className='select select-secondary select-bordered select-md' value={amount} onChange={handleAmount}>
              {genrateAmount(10)}
            </select>
          </div>
          {/* cartbutton */}
          <div className='mt-10'>
            <button className='btn btn-secondary btn-md' onClick={addToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;

//defaultly the loader from the routerv6.4 consist parameters from that we can extract the params object
// single page section is used in return
// used the daisy ui  breadcrumb  so the li used inside are act like the property on the ui compoennt
//productcolor is the 0 index of the array in colors and we conmpare the selected color index value === bordercolor index value so that we can match the both the color, for color select backg have a variable and when that valraible value changed make the appear the bcg around it
//daisy ui form control select is used
//generateAmountOptions array.from is used
