import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { BookmarksState } from '../../states/bookmark.reducer';

import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { CityTypeaheadItem } from 'src/app/shared/models/city-typeahead-item.model';

import * as fromBookmarksActions from '../../states/bookmark.actions';
import * as fromBookmarksSelectors from '../../states/bookmark.selectors';
@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit, OnDestroy {
  bookmarks$!: Observable<Bookmark[]>;
  public searchControlWithAutoComplete = new FormControl(undefined);
  private componentDestroyed$ = new Subject();
  constructor(private store: Store<BookmarksState>) {}

  ngOnInit(): void {
    this.bookmarks$ = this.store.pipe(
      select(fromBookmarksSelectors.selectBookmarksList)
    );

    this.searchControlWithAutoComplete.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value: CityTypeaheadItem) => {
        this.store.dispatch(
          fromBookmarksActions.toggleBookmarkById({
            id: value.geonameid.toString(),
          })
        );
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  removeBookmark(id: number): void {
    this.store.dispatch(fromBookmarksActions.removeBookmark({ id }));
  }
}
