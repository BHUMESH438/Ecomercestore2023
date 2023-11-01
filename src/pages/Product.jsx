import { Filters, PaginationContainer, ProductsContainer } from '../components';
import { customFetch } from '../utils';

const url = `/products`;

const allProductsQuery = queryParams => {
  const { search, category, company, sort, price, shipping, page } = queryParams;
  //the other query key than the products are for the filter search componenet as once the user searched a filterd search and again repeats the same it will be cached and no loading time occurs. to avoid null/undefined ?? is used.nullishcollasing operator
  return {
    queryKey: ['products', search ?? '', category ?? 'all', company ?? 'all', sort ?? 'a-z', price ?? 100000, shipping ?? false, page ?? 1],
    queryFn: () =>
      customFetch(url, {
        params: queryParams
      })
  };
};

export const loader =
  queryClient =>
  async ({ request }) => {
    // gives keyvalue pairs
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    const response = await queryClient.ensureQueryData(allProductsQuery(params));
    const {
      data: { data: productdata }
    } = response;
    // const productdata = response.data.data;
    const meta = response.data.meta;
    return { productdata, meta, params };
  };

const Product = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Product;

/* manual way of getting the searchparams
 const params = new URL(request.url).searchParams;
  const search = params.get('search');
  console.log(search);


  params obj passed in the axios is alsio given to the filter componenet and it params are destructured
    const { meta, params } = useLoaderData();
  console.log(params);
  const { search, company, category, shipping, order, price } = params;
  console.log(search, company, category, shipping, order, price);

  react router6.4-->useloderfunction() once we use the loader data in the component we can use useloaderdata() any ware in the deep inside that page's component 
   */
