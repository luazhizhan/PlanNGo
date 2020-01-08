import { Component } from '@angular/core';
import User from 'src/app/interfaces/user';
import TravelJournal from 'src/app/interfaces/travelJournal';
import { ModalController } from '@ionic/angular';
import { JournalFilterPage } from '../modals/journal-filter/journal-filter.page';
import { TravelJournalService } from '../../services/travel-journal/travel-journal.service';
import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-journal',
  templateUrl: 'journal.page.html',
  styleUrls: ['journal.page.scss']
})
export class JournalPage {
  user: User;
  journalList: TravelJournal[];
  loading = true;
  constructor(
    private modalController: ModalController,
    private authSvc: AuthService,
    private travelJournalSvc: TravelJournalService,
    private utilsSvc: UtilsService
  ) {}

  async ngOnInit() {
    this.user = this.authSvc.getUserInfo();
    const params = {};
    this.travelJournalSvc.getTravelJournal(params).subscribe(
      journalList => {
        this.journalList = journalList.results;
        this.loading = false;
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e)
    );
  }

  async travelJournalClick(travelJournal: TravelJournal) {
    this.utilsSvc.navigateForward(
      {
        journal: JSON.stringify(travelJournal)
      },
      '/tabs/journal/journal-details/'
    );
    // const params = {
    // 	travelJournalID:journal.travelJournalID
    // };
    // this.travelJournalSvc.getTravelJournal(params).subscribe((journalList) => {
    // 	this.journalList = journalList.results;
    // 	this.loading = false;
    // }, async (e) => await this.utilsSvc.presentAsyncErrorToast(e));
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: JournalFilterPage
    });
    return await modal.present();
  }
}
