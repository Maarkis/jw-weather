import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BookmarksState } from './bookmark.reducer';

export const selectBookmarksState = createFeatureSelector<BookmarksState>(
  'bookmarks'
);

export const selectBookmarksList = createSelector(
  selectBookmarksState,
  (bookmarksState: BookmarksState) => bookmarksState.bookmarksList
);
