import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from './home.reducer';

export const selectHomeState = createFeatureSelector<HomeState>('home');

export const selectCurrentWeather = createSelector(
  selectHomeState,
  (home: HomeState) => home.entity
);

export const selectCurrentWeatherLoading = createSelector(
  selectHomeState,
  (home: HomeState) => home.loading
);

export const selectCurrentWeatherError = createSelector(
  selectHomeState,
  (home: HomeState) => home.error
);
