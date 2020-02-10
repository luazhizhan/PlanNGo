import {
  Component,
  OnInit
} from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { CameraService } from '../../services/camera/camera.service';
import {
  ActionSheetController,
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';
import { TravelPlanService } from '../../services/travel-plan/travel-plan.service';
import { TravelJournalService } from '../../services/travel-journal/travel-journal.service';
import User from 'src/app/interfaces/user';
import TravelPlan from 'src/app/interfaces/travelPlan';
import TravelJournal from 'src/app/interfaces/travelJournal';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import WishList from '../../interfaces/wishList';
import { WishlistService } from '../../services/wishlist/wishlist.service';
import { ImageService } from '../../services/image/image.service';
import Image from 'src/app/interfaces/image';

@Component({
  selector: 'app-journal-details',
  templateUrl: './journal-details.page.html',
  styleUrls: ['./journal-details.page.scss']
})
export class JournalDetailsPage implements OnInit {
  image: any;
  imageArr: any[] = [];
  imageObj: any;
  travelJournal: TravelJournal;
  journalList: TravelJournal[];
  journalForm: FormGroup;
  wishList: WishList;
  user: User;
  imageList: Image[];
  loading = true;
  isOwner = false;
  travelPlanID: string;
  // travelPlan: TravelPlan[];
  travelPlan: TravelPlan[];
  isCreate = true;
  pageTitle = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private travelJournalSvc: TravelJournalService,
    private utilsSvc: UtilsService,
    private alertController: AlertController,
    private wishListService: WishlistService,
    private authSvc: AuthService,
    private imageSvc: ImageService,
    private cameraService: CameraService,
    private travelPlanSvc: TravelPlanService,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private actionSheetController: ActionSheetController,
    private loadingCtrl: LoadingController
  ) {
    this.journalForm = this.formBuilder.group(
      {
        travelJournalID: ['', [Validators.required]],
        wishListItem: ['', [Validators.required]],
        location: ['', [Validators.required]],
        imageID: ['', [Validators.required]],
        journalDetails: ['', [Validators.required]],
        timestamp: ['', [Validators.required]],
        username: ['', [Validators.required]],
        image: [''],
        desc: [''],
        category:['']
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
    this.activatedRoute.queryParams.subscribe(params => {
      if (Object.keys(params).length) {
        this.isCreate = false;
        this.travelJournal = JSON.parse(params.journal);
        this.journalForm.setValue({
          travelJournalID: this.travelJournal.travelJournalID,
          wishListItem: '',
          location: '',
          imageID: '',
          journalDetails: '',
          timestamp: '',
          username: '',
          image: '',
          desc: '',
          category:''
        });
        const journalParams = {
          travelJournalID: this.travelJournal.travelJournalID
        };
        this.fetchTravelJournal(journalParams, {});
      } else {
        this.pageTitle = 'Create Journal';
        this.journalForm = this.createForm();
        this.travelPlanSvc.getTravelPlansByUserID(this.user.userID).subscribe(res => {
          if (res && res.results) {
            this.travelPlan = res.results;
            this.loading = false;
          }
        });
        this.journalForm.setValue({
          wishListItem: 'test',
          desc: '3+1 Image',
          category: ''
        });
        this.journalForm.updateValueAndValidity();
      }
    });
  }

  createForm() {
    return new FormGroup({
      wishListItem: new FormControl(''),
      desc: new FormControl(''),
      category: new FormControl('')
    });
  }

  // create journal portion

  setTravelJournalObj(
    travelJournalID: number,
    userID: number,
    imageID: number,
    values: TravelJournal
  ) {
    this.travelJournal = {
      wishListItem: values.wishListItem,
      desc: values.desc,
      image: JSON.stringify(this.imageArr),
      travelJournalID,
      userID,
      imageID,
      category: values.category,
      journalDetails:values.journalDetails
    };
  }

  onDelete(travelJournalID) {
    const payload = {
      travelJournalID,
      userID: this.user.userID
    };
    this.travelJournalSvc.removeTravelJournal(payload).subscribe(
      async result => {
        await this.utilsSvc.presentStatusToast(
          result,
          'Travel Journal has been deleted successfully'
        );
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e)
    );
  }

  onSubmit(values: TravelJournal) {
    this.setTravelJournalObj(undefined, this.user.userID, undefined, values);
    this.travelJournalSvc.travelJournalSubmit(this.travelJournal, 'create').subscribe(
      async result => {
        await this.utilsSvc.presentStatusToast(
          result,
          'Travel Journal Has been created successfully'
        );
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e)
    );
  }

  async getCamera() {
    if(this.imageArr.length < 4) {
      const actionSheet = await this.actionSheetController.create({
        header: 'Select Image source',
        buttons: [
          {
            text: 'Pick from Gallery',
            handler: () => {
              const options = {
                maximumImagesCount: 4,
                width: 200,
                quality: 100,
                outputType: 1
              };
              this.imagePicker.getPictures(options).then(
                results => {
                  for (var i = 0; i < results.length; i++) {
                    // const image = (window as any).Ionic.WebView.convertFileSrc(
                    //   results[i]
                    // );
                    this.imageArr.push('data:image/jpeg;base64,' + results[i]);
                    console.log('imageArr: ' + this.imageArr);
                  }
                },
                err => {
                  alert(err);
                }
              );
            }
          },
          {
            text: 'Use Camera',
            handler: () => {
              this.cameraService
                .takePicture(this.camera.PictureSourceType.CAMERA)
                .then(imageData => {
                  console.log('image: ' + imageData[0].originalData);
                  const image = (window as any).Ionic.WebView.convertFileSrc(
                    imageData[0].originalData
                  );
                  this.imageArr.push(image);
                });
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      await actionSheet.present();
    } else {
      await (await this.utilsSvc.presentToast('Only 4 pictures allowed', 'bottom', 'danger', true)).present();
      }
  }

  // journal details portion
  async fetchTravelJournal(journalParams, imageParams) {
    this.loading = true;
    this.imageSvc.getImage(imageParams).subscribe(
      imageList => {
        // this.imageList = imageList.results;
        const images = imageList.results;
        this.imageList = images.map(image => {
          //const buf = image.image.data;
          const buf = image.image.split(`,`);
          let index = 0;
          return {
            imageID: image.imageID,
            image: buf
              .map(imageBuf => {
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
              .filter(image => image !== undefined),
            description: image.description
          };
          // return {
          // 	imageID: image.imageID,
          // 	image: this.arrayBufferToBase64(buf),
          // 	description: image.description
          // };
        });
        this.travelJournalSvc.getTravelJournal(journalParams).subscribe(
          journalList => {
            this.journalList = journalList.results.map(journal => {
              this.isOwner = journal.userID === this.user.userID ? true : false;
              const date = new Date(journal.timestamp);
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              return {
                ...journal,
                timestamp: `${day}/${month}/${year} ${date.toLocaleTimeString()}`,
                image: this.imageList
                  .filter(image => image.imageID === journal.imageID)
                  .map(obj => obj.image)
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
            this.pageTitle = this.journalList[0].wishListItem;
            this.loading = false;
          },
          async e => await this.utilsSvc.presentAsyncErrorToast(e)
        );
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e)
    );
  }

  arrayBufferToBase64 = buffer => {
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
      description: values.journalDetails
      //userID,

      // description: values.
      // itineraryPlace: values.location,
      // likes: 1,
      // status: 0
    };
  }
  async presentAlertConfirm(journal: TravelJournal) {
    const loadingPopup = await this.loadingCtrl.create({ message: 'Loading' });
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
            loadingPopup.present();
            this.setWishListObj(this.user.userID, journal);
            this.wishListService.createWishList(this.wishList).subscribe(
              async result => {
                await this.utilsSvc.presentStatusToast(result, 'Added to wishlist successfully');
                this.loading = false;
              },
              async e => {
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
