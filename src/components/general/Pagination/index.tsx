import React from 'react';
import './index.scss';

const Pagination = (props: any) => {
  const { handlePage, currentPage } = props;
  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          className={`pagination__button shadow ${
            currentPage === page.toString() ? 'pagination__button--active' : ''
          } `}
          type="button"
          onClick={() => handlePage(page.toString())}
          key={page}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
