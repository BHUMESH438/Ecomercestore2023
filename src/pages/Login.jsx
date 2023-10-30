import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
//why do we need action in the login page
// as we logged in we will be tied to the data of the logged in user along with the jwt token from the server
export const action =
  store =>
  async ({ request }) => {
    console.log('loginreq', request);
    const fromData = await request.formData();
    const data = Object.fromEntries(fromData);
    console.log('logindata', data);
    try {
      const response = await customFetch.post('/auth/local', data);

      store.dispatch(loginUser(response.data));
      toast.success('logged in successfully');
      return redirect('/');
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.error?.message || 'please double check your credentials';

      toast.error(errorMessage);
      return null;
    }
  };
//in above action we pass the parameter as store from redux  beacuause if not it will be invoked within the app componenet
const Login = () => {
  //demo user
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret'
      });
      dispatch(loginUser(response.data));
      toast.success('welcome guest user');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('guest user login error.please try later.');
    }
  };

  return (
    <section className='h-screen grid place-items-center'>
      <Form method='post' className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
        <h4 className='text-center text-3xl font-bold'>Login</h4>
        <FormInput type='email' label='email' name='identifier' defaultValue='test@test.com' />
        <FormInput type='password' label='password' name='password' defaultValue='secret' />
        <div className='mt-4'>
          <SubmitBtn text='login' />
        </div>
        <button type='button' className='btn btn-secondary btn-block' onClick={loginAsGuestUser}>
          guest user
        </button>
        <p className='text-center'>
          Not a member yet?
          <Link to='/register' className='ml-2 link link-hover link-primary capitalize'>
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
