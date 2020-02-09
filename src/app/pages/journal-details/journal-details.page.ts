import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import TravelJournal from '../../interfaces/travelJournal';
import { TravelJournalService } from '../../services/travel-journal/travel-journal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from '../../services/utils/utils.service';
import { AlertController } from '@ionic/angular';
import WishList from '../../interfaces/wishList';
import User from 'src/app/interfaces/user';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { AuthService } from '../../services/auth/auth.service';
import { ImageService } from '../../services/image/image.service';
import Image from 'src/app/interfaces/image';

@Component({
	selector: 'app-journal-details',
	templateUrl: './journal-details.page.html',
	styleUrls: [ './journal-details.page.scss' ]
})
export class JournalDetailsPage implements OnInit {
	travelJournal: TravelJournal;
	journalList: TravelJournal[];
	journalForm: FormGroup;
	wishList: WishList;
	user: User;
	imageList: Image[];
	loading = true;
	isOwner = false;

	constructor(
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private travelJournalSvc: TravelJournalService,
		private utilsSvc: UtilsService,
		private alertController: AlertController,
		private wishListService: WishlistService,
		private authSvc: AuthService,
		private imageSvc: ImageService
	) {
		this.journalForm = this.formBuilder.group(
			{
				travelJournalID: [ '', [ Validators.required ] ],
				wishListItem: [ '', [ Validators.required ] ],
				location: [ '', [ Validators.required ] ],
				imageID: [ '', [ Validators.required ] ],
				journalDetails: [ '', [ Validators.required ] ],
				timestamp: [ '', [ Validators.required ] ],
				username: [ '', [ Validators.required ] ],
				image: [ '' ]
			},
			{}
		);
	}
	slideOpts = {
		initialSlide: 1,
		speed: 400
	};
	ngOnInit() {
		this.user = this.authSvc.getUserInfo();
		this.activatedRoute.queryParams.subscribe((params) => {
			if (Object.keys(params).length) {
				this.travelJournal = JSON.parse(params.journal);
				this.journalForm.setValue({
					travelJournalID: this.travelJournal.travelJournalID,
					wishListItem: '',
					location: '',
					imageID: '',
					journalDetails: '',
					timestamp: '',
					username: '',
					image: ''
				});
			}
			const journalParams = {
				travelJournalID: this.travelJournal.travelJournalID
			};
			this.fetchTravelJournal(journalParams, {});
		});
	}

	async fetchTravelJournal(journalParams, imageParams) {
		this.loading = true;
		this.imageSvc.getImage(imageParams).subscribe((imageList) => {
			// this.imageList = imageList.results;
			const images = imageList.results;
			this.imageList = images.map((image) => {
				//const buf = image.image.data;
				const buf = image.image.split(`,`);
				let index = 0;
				return {
					imageID: image.imageID,
					image: buf
						.map((imageBuf) => {
							if (imageBuf.includes('data:image/jpeg;base64')) {
								imageBuf = imageBuf.includes('[')
									? `${imageBuf.substring(imageBuf.indexOf(`[`) + 1)},${buf[index + 1]}`
									: buf[index + 1].includes(']')
										? `${imageBuf},${buf[index + 1].substring(0, buf[index + 1].indexOf(']') - 1)}`
										: `${imageBuf},${buf[index + 1]}`;
								index += 2;
								return imageBuf.replace(/\"/g, '');
							}
						})
						.filter((image) => image !== undefined),
					description: image.description
				};
				// return {
				// 	imageID: image.imageID,
				// 	image: this.arrayBufferToBase64(buf),
				// 	description: image.description
				// };
			});
			this.travelJournalSvc.getTravelJournal(journalParams).subscribe((journalList) => {
				this.journalList = journalList.results.map((journal) => {
					this.isOwner = journal.userID === this.user.userID ? true : false;
					const date = new Date(journal.timestamp);
					const day = date.getDate();
					const month = date.getMonth() + 1;
					const year = date.getFullYear();
					return {
						...journal,
						timestamp: `${day}/${month}/${year} ${date.toLocaleTimeString()}`,
						image: this.imageList
							.filter((image) => image.imageID === journal.imageID)
							.map((obj) => obj.image)
					};
				});
				// const wishListParams={
				// 	wishListID:this.journalList.map((journal)=>journal.wishListID)
				// }
				// this.wishListService.getWishList(wishListParams).subscribe((wishListArr)=>{
				// 	this.wishList = wishListArr.results.map((wishList)=>{
				// 		this.wishList=wishList;
				// 	})
				// })
				this.loading = false;
			}, async (e) => await this.utilsSvc.presentAsyncErrorToast(e));
		}, async (e) => await this.utilsSvc.presentAsyncErrorToast(e));
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

	setWishListObj(userID: number, values: TravelJournal) {
		this.loading = true;
		this.wishList = {
			category: values.category,
			name: values.wishListItem,
			description: values.journalDetails,
			url: '',
			price: 0,
			location: '',
			openingTime: '',
			travelPlanID: 1
			//userID,

			// description: values.
			// itineraryPlace: values.location,
			// likes: 1,
			// status: 0
		};
	}

	async presentAlertConfirm(journal: TravelJournal, loadingPopup: HTMLIonLoadingElement) {
		const alert = await this.alertController.create({
			header: 'Confirm',
			message: 'Do you want to add this itinerary to your wishlist?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary'
				},
				{
					text: 'Confirm',
					handler: () => {
						this.setWishListObj(this.user.userID, journal);
						this.wishListService.createWishList(this.wishList).subscribe(
							async (result) => {
								await this.utilsSvc.presentStatusToast(result, 'Added to wishlist successfully');
								this.loading = false;
							},
							async (e) => {
								await this.utilsSvc.presentAsyncErrorToast(e);
								this.loading = false;
							},
							() => loadingPopup.dismiss()
						);
					}
				}
			]
		});

		await alert.present();
	}
}
