import { Form, Link, useLoaderData } from 'react-router-dom';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { search, company, category, shipping, order, price } = params;

  return (
    <Form className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-end'>
      {/* formsearch */}
      <FormInput type='search' label='search product' name='search' defaultValue={search} size='input-sm' />
      {/* formselect */}
      <FormSelect label='select category' name='category' list={meta.categories} defaultValue={category} size='select-sm' />
      <FormSelect label='select company' name='company' list={meta.companies} defaultValue={company} size='select-sm' />
      <FormSelect label='sort by' name='order' list={['a-z', 'z-a', 'high', 'low']} defaultValue={order} size='select-sm' />
      <FormRange label='select price' price={price} name='price' size='range-sm' />
      <FormCheckbox label='free shipping' name='shipping' defaultValue={shipping} size='checkbox-sm' />
      {/* buttons */}
      <button type='submit' className='btn btn-primary btn-sm '>
        search
      </button>
      <Link to='/products' className='btn btn-accent btn-sm'>
        reset
      </Link>
    </Form>
  );
};
export default Filters;

//type we given search so it will give the value to param url
//name is important as it is used as the form property/key of the form object fron react router form
//size input-sm is not supported in tailwind and it is supported in the daisy ui conponent
//for reset button we can just do it by providing the link of the initial router page

//we give the default values form the params to the forms feild so the data can be persisted from the last search
