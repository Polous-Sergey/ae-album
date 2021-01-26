import React from 'react';

import './image-list-pagination.css';

const ImageListPagination = ({ page, pageCount, setPage, loading }) => {
  return (
    <nav className="mt-5 mx-auto">
      <ul className="pagination">
        <li className={ `page-item${ loading || page < 2 ? ' disabled' : '' }` }>
          <div className="page-link" onClick={ () => setPage(page - 1) }>Previous</div>
        </li>
        <li className={ `page-item${ loading || pageCount <= page ? ' disabled' : '' }` }>
          <div className="page-link" onClick={ () => setPage(page + 1) }>Next</div>
        </li>
      </ul>
    </nav>
  );
};

export default ImageListPagination;
