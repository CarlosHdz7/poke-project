import { useState, useEffect } from 'react';

import { IUsePagination } from 'interfaces/IPagination';

const usePagination = (initialConfig: IUsePagination) => {
  const [paginationConfigState, setPaginationConfigState] = useState(initialConfig);

  const { offset, allElements, totalElementsCount, elementsPerPage } = paginationConfigState;

  useEffect(() => {
    setPagesCount();
  }, [totalElementsCount]);

  useEffect(() => {
    setCurrentElements();
  }, [offset, allElements]);

  const setPagesCount = () => {
    const pagesCount = Math.ceil(totalElementsCount / elementsPerPage);
    setPaginationConfigState((state: IUsePagination) => ({ ...state, pagesCount }));
  };

  const setCurrentElements = () => {
    const currentPageElements = allElements ? allElements.slice(offset, offset + elementsPerPage) : [];
    setPaginationConfigState((state: IUsePagination) => ({ ...state, currentPageElements }));
  };

  const handlePageClick = (pageNumber: number) => {
    const currentPage = pageNumber - 1;
    const newOffset = currentPage * elementsPerPage;
    setPaginationConfigState((prev: IUsePagination) => ({ ...prev, offset: newOffset }));
  };

  return { paginationConfigState, handlePageClick, setPaginationConfigState };
};

export default usePagination;
