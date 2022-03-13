import { IBookmark } from 'interfaces/IBookmark';
import bookmarksMock from 'mocks/bookmarksMock';
import React from 'react';
import bookmarksReducer from './bookmarks.reducer';

describe('Testing bookmark reducer', () => {
  it('should return the initial state', () => {
    expect(bookmarksReducer(undefined, {})).toEqual([]);
  });

  it('should add bookmark', () => {
    const previousState: IBookmark[] = [];
    const action = {
      type: 'ADD_BOOKMARK',
      payload: bookmarksMock[0],
    };
    expect(bookmarksReducer(previousState, action)).toEqual([bookmarksMock[0]]);
  });

  it('should remove bookmark', () => {
    const previousState: IBookmark[] = [bookmarksMock[0]];
    const action = {
      type: 'REMOVE_BOOKMARK',
      payload: { uid: 25 },
    };
    expect(bookmarksReducer(previousState, action)).toEqual([]);
  });

  it('should set bookmarks', () => {
    const previousState: IBookmark[] = [];
    const action = {
      type: 'SET_BOOKMARK',
      payload: bookmarksMock,
    };

    expect(bookmarksReducer(previousState, action)).toEqual(bookmarksMock);
  });
});
