import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { Weather } from '../../models/weather.model';

@Component({
  selector: 'app-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedWeatherComponent {
  @Input() weather!: Weather;

  get weatherIcon(): string {
    return `${environment.urlImageOpenWeather.replace(
      '$icon',
      this.weather.icon
    )}`;
  }
}
