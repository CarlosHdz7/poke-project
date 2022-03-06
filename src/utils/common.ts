import { IBookmark } from '../interfaces/IBookmark';

const setCapitalLetter = (text: string) => text[0].toUpperCase() + text.slice(1);

const isBookmarked = (bookmarks: IBookmark[], id?: number) => {
  const bookmark = bookmarks.find((x) => x.uid === id);
  return !!bookmark;
};

export default { setCapitalLetter, isBookmarked };
