import React from 'react';
import './index.scss';

const Pagination = (props: any) => {
  const { handlePage } = props;
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button className="pagination__button" type="button" onClick={() => handlePage(page.toString())}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
