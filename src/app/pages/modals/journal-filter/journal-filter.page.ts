import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-journal-filter',
	templateUrl: './journal-filter.page.html',
	styleUrls: [ './journal-filter.page.scss' ]
})
export class JournalFilterPage implements OnInit {
	selectedOption: any;
	constructor(private modalController: ModalController) {}

	ngOnInit() {}

	async closeModal() {
		await this.modalController.dismiss();
	}

	optionSelected() {
		switch (this.selectedOption) {
			case 'personal':
				this.selectedOption = 'personal';
				break;
			case 'others':
				this.selectedOption = 'others';
				break;
		}
	}
}
