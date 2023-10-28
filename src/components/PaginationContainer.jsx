import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  //to get the number of pages in an array and map that array ti return button on click element
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1;
  });
  //in the return onclick element this fn is invoked to page navigation
  const handlePageChange = pageNumber => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) return null;
  return (
    <div className='mt-16 flex justify-end'>
      <div className='mt-16 flex justify-end'>
        <div className='join'>
          <button
            className='btn btn-xs sm:btn-md join-item'
            onClick={() => {
              let prevPage = page - 1;
              //here we pass the prevpage number
              if (prevPage < 1) prevPage = pageCount;
              handlePageChange(prevPage);
            }}
          >
            Prev
          </button>
          {pages.map(pageNumber => {
            return (
              <button onClick={() => handlePageChange(pageNumber)} key={pageNumber} className={`btn btn-xs sm:btn-md border-none join-item ${pageNumber === page ? 'bg-base-300 border-base-300' : ''}`}>
                {pageNumber}
              </button>
            );
          })}
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
    </div>
  );
};
export default PaginationContainer;
