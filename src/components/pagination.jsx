import React from 'react';

// import ReactPaginate from 'react-paginate';

import ReactPaginateModule from 'react-paginate';
const ReactPaginate = ReactPaginateModule.default || ReactPaginateModule;

const Pagination = ({pageNumber, setPageNumber, totalPages}) => {

    console.log("ReactPaginate es:", ReactPaginate);

    const paginas = totalPages > 0 ? totalPages : 1;

    return (
        <ReactPaginate
              className="pagination justify-content-center gap-2 mt-4"
              nextLabel="Siguiente"
              previousLabel="Anterior"
              nextClassName="btn btn-outline-primary fw-bold"
              previousClassName="btn btn-outline-primary fw-bold"
              pageClassName="page-item fw-semibold"
              pageLinkClassName="page-link rounded"
              activeClassName="active"
              forcePage={pageNumber - 1} 
              pageCount={paginas}
              onPageChange={(data) => {
                setPageNumber(data.selected + 1);
              }}
            />
    );
};

export default Pagination;