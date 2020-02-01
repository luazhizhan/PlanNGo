import { Component } from '@angular/core';
import User from 'src/app/interfaces/user';
import TravelJournal from 'src/app/interfaces/travelJournal';
import { ModalController } from '@ionic/angular';
import { JournalFilterPage } from '../modals/journal-filter/journal-filter.page';
import { TravelJournalService } from '../../services/travel-journal/travel-journal.service';
import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';
import { ImageService } from '../../services/image/image.service';
import Image from 'src/app/interfaces/image';

@Component({
	selector: 'app-journal',
	templateUrl: 'journal.page.html',
	styleUrls: [ 'journal.page.scss' ]
})
export class JournalPage {
	user: User;
	journalList: TravelJournal[];
	imageList: Image[];
	loading = true;
	filterValue = 'all';
	categoryValue = 'place';
	constructor(
		private modalController: ModalController,
		private authSvc: AuthService,
		private travelJournalSvc: TravelJournalService,
		private utilsSvc: UtilsService,
		private imageSvc: ImageService
	) {}

	async ngOnInit() {
		this.user = this.authSvc.getUserInfo();
		const journalParams = {
			//category: this.categoryValue
		};
		const imageParams = {};
		this.fetchTravelJournal(journalParams, imageParams);
	}

	async fetchTravelJournal(journalParams, imageParams) {
		this.loading = true;
		this.imageSvc.getImage(imageParams).subscribe((imageList) => {
			// this.imageList = imageList.results;
			const images = imageList.results;
			this.imageList = images.map((image) => {
				const buf = image.image.data;
				return {
					imageID: image.imageID,
					image: this.arrayBufferToBase64(buf),
					description: image.description
				};
			});
			this.travelJournalSvc.getTravelJournal(journalParams).subscribe((journalList) => {
				this.journalList = journalList.results.map((journal) => {
					return {
						...journal,
						image: this.imageList
							.filter((image) => image.imageID === journal.imageID)
							.map((obj) => obj.image)
					};
				});
				this.loading = false;
			}, async (e) => await this.utilsSvc.presentAsyncErrorToast(e));
		}, async (e) => await this.utilsSvc.presentAsyncErrorToast(e));
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

	arrayBufferToBase64 = (buffer) => {
		let binary = '';
		const bytes = new Uint8Array(buffer);
		const len = bytes.byteLength;
		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return binary;
		// return window.btoa(binary);
	};

	segmentChanged(ev: any) {
		this.categoryValue = ev.detail.value;
		const journalParams =
			this.filterValue === 'personal'
				? {
						userID: this.user.userID,
						category: this.categoryValue
					}
				: {
						category: this.categoryValue
					};
		console.log(journalParams);
		const imageParams = {};
		this.journalList = [];
		this.fetchTravelJournal(journalParams, imageParams);
	}

	filterSegmentChanged(ev: any) {
		this.filterValue = ev.detail.value;
		this.categoryValue = 'place';
		const journalParams =
			this.filterValue === 'personal'
				? {
						userID: this.user.userID,
						category: this.categoryValue
					}
				: {
						category: this.categoryValue
					};
		console.log(journalParams);
		const imageParams = {};
		this.journalList = [];
		this.fetchTravelJournal(journalParams, imageParams);
	}
}
