import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CityWeather } from '../models/weather.model';
import { responseToCityWeather } from '../utils/response.utils';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCityWeatherByQuery(query: string): Observable<CityWeather> {
    const param = new HttpParams({ fromObject: { q: query } });
    return this.doGet('weather', param).pipe(
      map((response) => responseToCityWeather(response))
    );
  }

  private doGet<T>(url: string, params: HttpParams): Observable<T> {
    params = params.append('appid', environment.apiKeyOpenWeather);
    params = params.append('lang', 'pt_br');
    return this.http.get<T>(`${environment.apiUrlOpenWeather}/${url}`, {
      params,
    });
  }
}
