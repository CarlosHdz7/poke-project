/* eslint-disable no-unused-vars */
import { IBookmark } from '../../interfaces/IBookmark';

const addBookmark = (data: IBookmark) => (dispatch: (action: { type: string; payload: IBookmark }) => void) => {
  dispatch({
    type: 'ADD_BOOKMARK',
    payload: data,
  });
};

const removeBookmark = (data: IBookmark) => (dispatch: (action: { type: string; payload: IBookmark }) => void) => {
  dispatch({
    type: 'REMOVE_BOOKMARK',
    payload: data,
  });
};

const setBookmarks = (data: IBookmark[]) => (dispatch: (action: { type: string; payload: IBookmark[] }) => void) => {
  dispatch({
    type: 'SET_BOOKMARK',
    payload: data,
  });
};

export { addBookmark, removeBookmark, setBookmarks };
