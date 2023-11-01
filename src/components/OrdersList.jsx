import { useLoaderData } from 'react-router-dom';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import day from 'dayjs';
day.extend(advancedFormat);

const OrdersList = () => {
  //used loder in the orders component for prefetching the data from the params to post
  const { orders, meta } = useLoaderData();
  console.log('>>>>>>>>', orders);
  console.log('>>>>>>>>meta', meta);

  return (
    <div className='mt-8'>
      <h4 className='mb-4 capitalize'>total orders:{meta.pagination.total}</h4>
      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              {/* can hide and appear const in a table */}
              <th className='hidden sm:block'>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => {
              const id = order.id;
              const { name, address, numItemsInCart, orderTotal, createdAt } = order.attributes;
              // date
              const date = day(createdAt).format('hh:mm a - MMM Do, YYYY ');
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className='hidden sm:block'>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersList;
