import { Form, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';

//cart to order
//order fn when each time ordered by the single person the data id must increase by one
export const action =
  (store, queryClient) =>
  async ({ request }) => {
    //getting form data
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    //user and order from store
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } = store.getState().cartState;
    const info = {
      name,
      address,
      chargeTotal: orderTotal, //for payment
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart
    };
    try {
      const response = await customFetch.post(
        '/orders',
        { data: info },
        //resticted route go with headers and pass the token
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      queryClient.removeQueries(['orders']);
      console.log('order response', response);
      store.dispatch(clearCart());
      toast.success('order placed successfully');
      return redirect('/orders');
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.error?.message || 'there was an error placing your order';
      toast.error(errorMessage);
      //auth error if the token is wrongly typed as tokens in redux - 401 unauthorized error we should redirect
      if (error?.response?.status === 401 || 403) redirect('/login');
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <Form method='POST' className='flex flex-col gap-y-4'>
      <h4 className='font-medium text-xl'>Shipping Information</h4>
      <FormInput label='first name' name='name' type='text' />
      <FormInput label='address' name='address' type='text' />
      <div className='mt-4'>
        <button type='submit' className='btn btn-primary btn-block'>
          submit
        </button>
      </div>
    </Form>
  );
};
export default CheckoutForm;
