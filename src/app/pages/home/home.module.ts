import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './states/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './states/home.effects';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HomePage } from './containers/home/home.page';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnitSelectorComponent } from './containers/unit-selector/unit-selector.component';
@NgModule({
  declarations: [HomePage, CurrentWeatherComponent, UnitSelectorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),
    ComponentsModule,
  ],
})
export class HomeModule {}
