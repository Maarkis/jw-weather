import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Bookmark } from 'src/app/shared/models/bookmark.model';
import { CityWeather } from 'src/app/shared/models/weather.model';
import {
  PortalOutlet,
  DomPortalOutlet,
  ComponentPortal,
} from '@angular/cdk/portal';
import * as fromHomeActions from '../../states/home.actions';
import * as fromHomeSelectors from '../../states/home.selectors';
import * as fromBookmarksSelectors from '../../../bookmarks/states/bookmark.selectors';
import { CityTypeaheadItem } from 'src/app/shared/models/city-typeahead-item.model';
import { UnitSelectorComponent } from '../unit-selector/unit-selector.component';
import { Units } from 'src/app/shared/models/units.enum';

import * as fromConfigSelectors from '../../../../shared/states/config/config.selectors';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  public searchControl!: FormControl;
  public searchControlWithAutoComplete!: FormControl;

  text!: string;
  cityWeather$!: Observable<CityWeather>;
  cityWeather!: CityWeather;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;

  bookmarksList$!: Observable<Bookmark[]>;
  isCurrentFavorite$!: Observable<boolean>;
  unit$!: Observable<Units>;

  private componentDestroyed$ = new Subject();

  private portalOutlet!: PortalOutlet;

  constructor(
    private store: Store,
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required);
    this.searchControlWithAutoComplete = new FormControl(undefined);
    this.searchControlWithAutoComplete.valueChanges.subscribe(
      (value: CityTypeaheadItem) => {
        if (!!value) {
          this.store.dispatch(
            fromHomeActions.loadCurrentWeatherById({
              id: value.geonameid.toString(),
            })
          );
        }
      }
    );

    this.cityWeather$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeather)
    );
    this.cityWeather$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((response: CityWeather) => (this.cityWeather = response));

    this.loading$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeatherLoading)
    );
    this.error$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeatherError)
    );

    this.bookmarksList$ = this.store.pipe(
      select(fromBookmarksSelectors.selectBookmarksList)
    );

    this.isCurrentFavorite$ = combineLatest([
      this.cityWeather$,
      this.bookmarksList$,
    ]).pipe(
      map(([current, bookmarksList]) => {
        if (!!current) {
          return bookmarksList.some(
            (bookmark) => bookmark.id === current.city.id
          );
        }
        return false;
      })
    );

    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
    this.setupPortal();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
    this.store.dispatch(fromHomeActions.clearHomeState());
    this.portalOutlet.detach();
  }

  doSearch(): void {
    this.store.dispatch(
      fromHomeActions.loadCurrentWeather({ query: this.searchControl.value })
    );
  }

  onToggleBookmark(): void {
    const bookmark = new Bookmark();
    bookmark.id = this.cityWeather.city.id;
    bookmark.name = this.cityWeather.city.name;
    bookmark.country = this.cityWeather.city.country;
    bookmark.coord = this.cityWeather.city.coord;
    this.store.dispatch(fromHomeActions.toggleBookmark({ bookmark }));
  }

  private setupPortal(): void {
    const element = document.querySelector('#navbar-portal-outlet');
    if (element) {
      this.portalOutlet = new DomPortalOutlet(
        element,
        this.componentFactoryResolver,
        this.appRef,
        this.injector
      );
      this.portalOutlet.attach(new ComponentPortal(UnitSelectorComponent));
    }
  }
}
