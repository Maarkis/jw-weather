import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Units } from 'src/app/shared/models/units.enum';

import { CityWeather } from 'src/app/shared/models/weather.model';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {
  @Input() cityWeather!: CityWeather | null;
  @Input() isFavorite!: boolean | null;
  @Input() unit!: Units | null;
  @Output() toggleBookmark = new EventEmitter();

  get cityName(): string {
    return `${this.cityWeather?.city?.name}, ${this.cityWeather?.city?.country}`;
  }

  onToggleBookMark(): void {
    this.toggleBookmark.emit();
  }
}
