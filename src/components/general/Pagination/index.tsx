import React from 'react'
import { IUsePagination } from '../../../interfaces/IPagination';

const Pagination = (props: IUsePagination) => {
  const { offset, allElements, totalElementsCount, elementsPerPage, pagesCount } = props;
  console.log('offset',offset)
  console.log('allElements',allElements)
  console.log('totalElementsCount',totalElementsCount)
  console.log('elementsPerPage',elementsPerPage)
  console.log('pagesCount',pagesCount)
  return (<div>index</div>)
}

export default Pagination;