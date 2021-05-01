import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Units } from 'src/app/shared/models/units.enum';
import { AppState } from 'src/app/shared/states/app.reducer';

import * as fromConfigActions from '../../../../shared/states/config/config.actions';
import * as fromConfigSelectors from '../../../../shared/states/config/config.selectors';
@Component({
  selector: 'app-unit-selector',
  templateUrl: './unit-selector.component.html',
  styleUrls: ['./unit-selector.component.scss'],
})
export class UnitSelectorComponent implements OnInit {
  unit$!: Observable<Units>;
  unit!: Units;

  unitsEnum = Units;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
    this.unit$.subscribe((unit) => (this.unit = unit));
  }

  updateUnit(unit: Units) {
    this.store.dispatch(fromConfigActions.updateUnit({ unit }));
  }
}
