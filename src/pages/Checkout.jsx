import { useSelector } from 'react-redux';
import { CartTotals, CheckoutForm, SectionTitle } from '../components';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

//user not logged in not show chekoutpage
//prevents the manual enter of specific page url
export const loader = store => async () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  }
  return null;
};
const Checkout = () => {
  //empty cart
  const cartItems = useSelector(state => state.cartState.cartItems);
  if (cartItems.length === 0) return <SectionTitle text='Your cart is empty' />;

  return (
    <>
      <SectionTitle text='Place your order' />
      <div className='mt-8 grid gap-8  md:grid-cols-2 items-start'>
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};
export default Checkout;
