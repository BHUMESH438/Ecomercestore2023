import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const ComplexPagination = () => {
  const { meta } = useLoaderData();
  console.log('commeta', meta);
  const { pageCount, page } = meta.pagination;
  const { search, pathname } = useLocation();
  console.log('comserpath', search, pathname);
  const navigate = useNavigate();

  const handlePageChange = pageNumber => {
    const searchParams = new URLSearchParams(search);
    console.log('handlePageChange searchparams', searchParams);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  //handlePageChange used in addPageButton
  //join , join-item is dasisyUI join component to join btn also make active class btn by tmplate string
  const addPageButton = ({ pageNumber, activeClasss }) => {
    return (
      <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} className={`btn btn-xs sm:btn-md border-none join-item ${activeClasss ? 'bg-base-300 border-base-300' : ''}`}>
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    //first button 1
    pageButtons.push(addPageButton({ pageNumber: 1, activeClasss: page === 1 }));

    //dots - after one dots will come ... as the page will be greater than two
    if (page > 2) {
      pageButtons.push(
        <button className='join-item btn btn-xs sm:btn-md' key='dots-1'>
          ...
        </button>
      );
    }

    //active/current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    // dots below 145 it will show ...
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className='join-item btn btn-xs sm:btn-md' key='dots-2'>
          ...
        </button>
      );
    }

    // last button
    pageButtons.push(addPageButton({ pageNumber: pageCount, activeClass: page === pageCount }));

    return pageButtons;
  };
  if (pageCount < 2) return null;

  return (
    <div className='mt-16 flex justify-end'>
      <div className='join'>
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className='btn btn-xs sm:btn-md join-item'
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ComplexPagination;
