import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { DailyWeather, Weather } from 'src/app/shared/models/weather.model';
import * as moment from 'moment-timezone';
import { environment } from 'src/environments/environment';
import { unitToSymbol } from 'src/app/shared/utils/units.utils';
import { Units } from 'src/app/shared/models/units.enum';

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyWeatherComponent {
  @Input() dailyWeather!: DailyWeather;
  @Input() timeZone?: string;
  @Input() unit?: Units;

  get weather(): Weather {
    return this.dailyWeather.weather;
  }

  get date(): string {
    return moment.unix(this.dailyWeather.date).format('DD MMM - dddd');
  }

  get weatherIcon(): string {
    if (this.weather) {
      return `${environment.urlImageOpenWeather.replace(
        '$icon',
        this.weather.icon
      )}`;
    } else {
      return '';
    }
  }

  get unitSymbol(): string {
    return unitToSymbol(this.unit);
  }
  unixToHourMinute(value: number): string {
    return moment
      .unix(value)
      .tz(this.timeZone ? this.timeZone : '')
      .format('HH:mm');
  }
}
