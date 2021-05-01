import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Units } from '../models/units.enum';
import { CityDailyWeather, CityWeather } from '../models/weather.model';
import { AppState } from '../states/app.reducer';
import {
  responseToCityDailyWeather,
  responseToCityWeather,
} from '../utils/response.utils';

import * as fromConfigSelectors from './../states/config/config.selectors';

@Injectable({
  providedIn: 'root',
})
export class WeatherService implements OnDestroy {
  serviceDestroyed$ = new Subject();
  private unit!: Units;
  constructor(private http: HttpClient, private store: Store<AppState>) {
    store
      .pipe(
        select(fromConfigSelectors.selectUnitConfig),
        takeUntil(this.serviceDestroyed$)
      )
      .subscribe((unit: Units) => (this.unit = unit));
  }

  ngOnDestroy(): void {
    this.serviceDestroyed$.next();
    this.serviceDestroyed$.unsubscribe();
  }

  getCityWeatherByQuery(query: string): Observable<CityWeather> {
    const param = new HttpParams({ fromObject: { q: query } });
    return this.doGet<CityWeather>('weather', param).pipe(
      map((response) => responseToCityWeather(response))
    );
  }

  getCityWeatherByCoord(lat: number, lon: number): Observable<CityWeather> {
    const params = new HttpParams({
      fromObject: {
        lat: lat.toString(),
        lon: lon.toString(),
      },
    });
    return this.doGet<CityWeather>('weather', params).pipe(
      map((response) => responseToCityWeather(response))
    );
  }

  getWeatherDetails(lat: number, lon: number): Observable<CityDailyWeather> {
    const params = new HttpParams({
      fromObject: {
        lat: lat.toString(),
        lon: lon.toString(),
        exclude: 'minutely,hourly',
      },
    });
    return this.doGet<CityDailyWeather>('onecall', params).pipe(
      map((response) => responseToCityDailyWeather(response))
    );
  }

  getCityWeatherById(id: string): Observable<CityWeather> {
    const params = new HttpParams({ fromObject: { id } });
    return this.doGet<CityWeather>('weather', params).pipe(
      map((response) => responseToCityWeather(response))
    );
  }

  private doGet<T>(url: string, params: HttpParams): Observable<T> {
    params = params.append('appid', environment.apiKeyOpenWeather);
    params = params.append('lang', 'pt_br');
    if (this.unit !== Units.SI) {
      params = params.append('units', this.unit.toLocaleLowerCase());
    }
    return this.http.get<T>(`${environment.apiUrlOpenWeather}/${url}`, {
      params,
    });
  }
}
