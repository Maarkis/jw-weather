import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Units } from '../../models/units.enum';
import { Weather } from '../../models/weather.model';
import { unitToSymbol } from '../../utils/units.utils';

@Component({
  selector: 'app-detailed-weather',
  templateUrl: './detailed-weather.component.html',
  styleUrls: ['./detailed-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailedWeatherComponent {
  @Input() weather?: Weather;
  @Input() unit?: Units;

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
}
