import { Form, Link, redirect } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
  console.log('registercompoeo');
  //getting form data
  console.log('request', request);
  //remember mf its fooorrrrmmmmdata not fromdata
  const fromData = await request.formData();
  console.log('fromdata', fromData);
  const data = Object.fromEntries(fromData);
  console.log('dataentirs', data);
  //use trycatch method
  try {
    const response = await customFetch.post('/auth/local/register', data);
    toast.success('account created successfully');
    console.log('response', response);
    return redirect('/login');
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error?.message || 'please double check your credentials';
    toast.error(errorMessage);
    return null;
  }
};
const Register = () => {
  return (
    <section className='h-screen grid place-items-center'>
      <Form method='post' className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
        <h4 className='text-center text-3xl font-bold'>Register</h4>
        <FormInput type='text' label='username' name='username' defaultValue='james smith' />
        <FormInput type='email' label='email' name='email' defaultValue='james@gmail.com' />
        <FormInput type='password' label='password' name='password' defaultValue='secret' />
        <div className='mt-4'>
          <SubmitBtn text='register' />
        </div>
        <p className='text-center'>
          Already a member?
          <Link to='/login' className='ml-2 link link-hover link-primary capitalize'>
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;

//the difference between action and loaders is that we can process the data in action after the process/form submission and in loader we can get the data before the form submission
//From tag from react router provides the data to the react actions
//and if you give the normal form tag the data wont be provided to the router
//for fromdata api see the js nuggets vedio
//for axios noneed to pass the get but other rq should be passed
//in action we send the formdata toserver to db and loaders we get the formdatta from server
