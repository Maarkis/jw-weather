import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { DetailedWeatherComponent } from './detailed-weather/detailed-weather.component';
import { CitiesTypeaheadComponent } from './cities-typeahead/cities-typeahead.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoaderComponent,
    DetailedWeatherComponent,
    CitiesTypeaheadComponent,
  ],
  imports: [
    CommonModule,
    TypeaheadModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoaderComponent,
    DetailedWeatherComponent,
    CitiesTypeaheadComponent,
  ],
})
export class ComponentsModule {}
