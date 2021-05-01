import { Action, createReducer, on } from '@ngrx/store';
import { Bookmark } from 'src/app/shared/models/bookmark.model';

import * as fromBookmarkActions from './bookmark.actions';
import * as fromHomeActions from '../../home/states/home.actions';

export interface BookmarksState {
  bookmarksList: Bookmark[];
}

export const bookMarksInitialState: BookmarksState = {
  bookmarksList: [],
};

const reducer = createReducer(
  bookMarksInitialState,
  on(
    fromHomeActions.toggleBookmark,
    (bookmarksState: BookmarksState, { bookmark }) => ({
      ...bookmarksState,
      bookmarksList: toggleBookmark(bookmarksState.bookmarksList, bookmark),
    })
  ),
  on(
    fromBookmarkActions.removeBookmark,
    (bookmarksState: BookmarksState, { id }) => ({
      ...bookmarksState,
      bookmarksList: bookmarksState.bookmarksList.filter(
        (bookmark: Bookmark) => bookmark.id !== id
      ),
    })
  ),
  on(fromBookmarkActions.updateBookmarksList, (state, { bookmarksList }) => ({
    ...state,
    bookmarksList,
  }))
);

export function bookmarkReducer(
  bookmarksState: BookmarksState | undefined,
  action: Action
): BookmarksState {
  return reducer(bookmarksState, action);
}

function toggleBookmark(
  bookmarksList: Bookmark[],
  bookmark: Bookmark
): Bookmark[] {
  if (!!bookmarksList.find((f: Bookmark) => f.id === bookmark.id)) {
    return bookmarksList.filter((f: Bookmark) => f.id !== bookmark.id);
  }
  return [...bookmarksList, bookmark];
}
