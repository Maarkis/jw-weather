import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { CityDailyWeather } from 'src/app/shared/models/weather.model';

import * as fromActionsDetails from './details.actions';

export interface DetailsState {
  entity?: CityDailyWeather;
  loading: boolean;
  error: boolean;
}

export const detailsInitialState: DetailsState = {
  entity: undefined,
  loading: false,
  error: false,
};

const reducer = createReducer(
  detailsInitialState,
  on(fromActionsDetails.loadWeatherDetails, (state: DetailsState) => ({
    ...state,
    entity: undefined,
    loading: true,
    error: false,
  })),
  on(
    fromActionsDetails.loadWeatherDetailsSuccess,
    (state: DetailsState, { entity }) => ({
      ...state,
      entity,
      loading: false,
      error: false,
    })
  ),
  on(fromActionsDetails.loadWeatherDetailsFailed, (state: DetailsState) => ({
    ...state,
    loading: false,
    error: true,
  }))
);
export function detailsReducer(
  state: DetailsState | undefined,
  action: Action
): DetailsState {
  return reducer(state, action);
}
