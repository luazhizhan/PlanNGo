import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import TravelJournal from '../../interfaces/travelJournal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-journal-details',
	templateUrl: './journal-details.page.html',
	styleUrls: [ './journal-details.page.scss' ]
})
export class JournalDetailsPage implements OnInit {
	travelJournal: TravelJournal;
	journalForm: FormGroup;

	constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
		this.journalForm = this.formBuilder.group(
			{
				travelJournalID: [ '', [ Validators.required ] ],
				title: [ '', [ Validators.required ] ],
				location: [ '', [ Validators.required ] ],
				imageID: [ '', [ Validators.required ] ],
				journalDetails: [ '', [ Validators.required ] ],
				timestamp: [ '', [ Validators.required ] ],
				username: [ '', [ Validators.required ] ]
			},
			{}
		);
	}

	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			if (Object.keys(params).length) {
				this.travelJournal = JSON.parse(params.journal);
				this.journalForm.setValue({
					travelJournalID: this.travelJournal.travelJournalID,
					title: this.travelJournal.title,
					location: this.travelJournal.location,
					imageID: this.travelJournal.imageID,
					journalDetails: this.travelJournal.journalDetails,
					timestamp: this.travelJournal.timestamp,
					username: this.travelJournal.username
				});
			}
		});
	}
}
