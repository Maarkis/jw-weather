import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { CityWeather } from 'src/app/shared/models/weather.model';

import * as fromHomeActions from '../../states/home.actions';
import * as fromHomeSelectors from '../../states/home.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  searchControl!: FormControl;

  text!: string;

  cityWeather!: CityWeather;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;

  private componentDestroy$ = new Subject();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required);

    this.store
      .pipe(
        select(fromHomeSelectors.selectCurrentWeather),
        takeUntil(this.componentDestroy$)
      )
      .subscribe((response: CityWeather) => (this.cityWeather = response));
    this.loading$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeatherLoading)
    );
    this.error$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeatherError)
    );
  }

  ngOnDestroy(): void {
    this.componentDestroy$.next();
    this.componentDestroy$.unsubscribe();
  }

  doSearch(): void {
    this.store.dispatch(
      fromHomeActions.loadCurrentWeather({ query: this.searchControl.value })
    );
  }

  onToggleBookmark(): void {
    const bookMark = new Bookmark();
    bookMark.id = this.cityWeather.city.id;
    bookMark.name = this.cityWeather.city.name;
    bookMark.country = this.cityWeather.city.country;
    bookMark.coord = this.cityWeather.city.coord;
  }
}
