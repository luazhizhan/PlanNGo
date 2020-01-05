import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JournalPage } from './journal.page';
import { JournalFilterPage } from '../modals/journal-filter/journal-filter.page';

@NgModule({
	imports: [
		IonicModule,
		CommonModule,
		FormsModule,
		RouterModule.forChild([ { path: '', component: JournalPage } ])
	],
	declarations: [ JournalPage, JournalFilterPage ],
	entryComponents: [ JournalFilterPage ]
})
export class JournalPageModule {}
