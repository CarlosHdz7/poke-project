import { combineReducers } from 'redux';
import bookmarksReducer from './store/bookmarks/bookmarks.reducer';

const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
