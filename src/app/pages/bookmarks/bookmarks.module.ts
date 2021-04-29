import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksPage } from './bookmarks.page';

@NgModule({
    declarations: [BookmarksPage],
    imports: [CommonModule],
    exports: [
        BookmarksPage
    ]
})
export class BookmarksModule {}
