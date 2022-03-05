import { IBookmark } from '../../interfaces/IBookmark';

const initialState: IBookmark[] = [];

const bookmarksReducer = (state: IBookmark[] = initialState, action: any = {}) => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return [...state, action.payload];
    case 'REMOVE_BOOKMARK':
      return state.filter((bookmark: any) => bookmark.uid !== action.payload.uid);
    case 'SET_BOOKMARK':
      return [...action.payload];
    default:
      return state;
  }
};

export default bookmarksReducer;
