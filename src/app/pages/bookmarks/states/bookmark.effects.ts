import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { CityWeather } from 'src/app/shared/models/weather.model';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { AppState } from 'src/app/shared/states/app.reducer';

import * as fromBookmarkActions from '../states/bookmark.actions';
import * as fromBookmarksSelectors from '../states/bookmark.selectors';

@Injectable()
export class BookmarksEffects {
  toggleBookmarkById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromBookmarkActions.toggleBookmarkById),
      withLatestFrom(
        this.store.pipe(select(fromBookmarksSelectors.selectBookmarksList))
      ),
      mergeMap(([{ id }, bookmarks]: [{ id: string }, Bookmark[]]) => {
        if (bookmarks.some((bookmark) => bookmark.id.toString() === id)) {
          return of(
            bookmarks.filter((bookmark) => bookmark.id.toString() !== id)
          );
        }
        return this.weatherService.getCityWeatherById(id).pipe(
          map((cityWeather: CityWeather) => {
            const bookmark = new Bookmark();
            bookmark.id = cityWeather.city.id;
            bookmark.coord = cityWeather.city.coord;
            bookmark.name = cityWeather.city.name;
            bookmark.country = cityWeather.city.country;
            console.log('Effects', bookmark);
            return [...bookmarks, bookmark];
          })
        );
      }),
      map((bookmarksList: Bookmark[]) =>
        fromBookmarkActions.updateBookmarksList({ bookmarksList })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private weatherService: WeatherService
  ) {}
}
