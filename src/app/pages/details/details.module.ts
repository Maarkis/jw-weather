import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPage } from './containers/details/details.page';
import { RouterModule, Routes } from '@angular/router';
import { DetailsGuardService } from './services/details.guard.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { DetailsEffects } from './states/details.effects';
import { detailsReducer } from './states/details.reducer';
import { DailyWeatherComponent } from './components/daily-weather/daily-weather.component';

const routes: Routes = [
  { path: '', component: DetailsPage, canActivate: [DetailsGuardService] },
];

@NgModule({
  declarations: [DetailsPage, DailyWeatherComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    StoreModule.forFeature('details', detailsReducer),
    EffectsModule.forFeature([DetailsEffects]),
    ComponentsModule,
  ],
  providers: [DetailsGuardService],
})
export class DetailsModule {}
