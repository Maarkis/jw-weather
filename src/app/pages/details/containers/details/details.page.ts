import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CityDailyWeather } from 'src/app/shared/models/weather.model';
import { AppState } from 'src/app/shared/states/app.reducer';

import * as fromDetailsActions from '../../states/details.actions';
import * as fromDetailsSelectors from '../../states/details.selectors';
import * as fromConfigSelectors from '../../../../shared/states/config/config.selectors';
import { Units } from 'src/app/shared/models/units.enum';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  details$!: Observable<CityDailyWeather | undefined>;
  loading$!: Observable<boolean>;
  error$!: Observable<boolean>;
  unit$!: Observable<Units>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(fromDetailsActions.loadWeatherDetails());

    this.details$ = this.store.pipe(
      select(fromDetailsSelectors.selectDetailsEntity)
    );
    this.loading$ = this.store.pipe(
      select(fromDetailsSelectors.selectDetailsLoading)
    );
    this.error$ = this.store.pipe(
      select(fromDetailsSelectors.selectDetailsError)
    );

    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
  }
}
