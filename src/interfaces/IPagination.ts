export interface IUsePagination {
  offset: number;
  currentPageElements: any[];
  elementsPerPage: number;
  pagesCount: number;
  allElements: any;
  totalElementsCount: number;
}