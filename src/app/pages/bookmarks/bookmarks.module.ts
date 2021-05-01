import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { bookmarkReducer } from './states/bookmark.reducer';
import { BookmarksPage } from './containers/bookmarks/bookmarks.page';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { BookmarksEffects } from './states/bookmark.effects';

@NgModule({
  declarations: [BookmarksPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('bookmarks', bookmarkReducer),
    EffectsModule.forFeature([BookmarksEffects]),
    ComponentsModule,
  ],
  exports: [BookmarksPage],
})
export class BookmarksModule {}
