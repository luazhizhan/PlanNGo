import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { CameraService } from '../../services/camera/camera.service';
import { ActionSheetController, Platform } from '@ionic/angular';

import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';
import { TravelPlanService } from '../../services/travel-plan/travel-plan.service';
import { TravelJournalService } from '../../services/travel-journal/travel-journal.service';
import User from 'src/app/interfaces/user';
import TravelPlan from 'src/app/interfaces/travelPlan';
import TravelJournal from 'src/app/interfaces/travelJournal';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-journal',
  templateUrl: 'journal.page.html',
  styleUrls: ['journal.page.scss']
})
export class JournalPage implements OnInit {
  imageArr: any[] = [];
  imageObj: any;

  journalForm: FormGroup;
  travelPlanID: string;
  // travelPlan: TravelPlan[];
  travelPlan: TravelPlan[];

  user: User;
  loading = true;

  travelJournal: TravelJournal;
  wishList: any;

  categoryArr: any[] = ['Places of Interest', 'Food'];
  constructor(
    private cameraService: CameraService,
    private travelPlanSvc: TravelPlanService,
    private travelJournalSvc: TravelJournalService,
    private authSvc: AuthService,
    private utilsSvc: UtilsService,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    this.journalForm = this.createForm();

    this.user = this.authSvc.getUserInfo();

    this.travelPlanSvc
      .getTravelPlansByUserID(this.user.userID)
      .subscribe(res => {
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

  createForm() {
    return new FormGroup({
      wishListItem: new FormControl(''),
      desc: new FormControl(''),
      category: new FormControl('')
    });
  }

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
      category: values.category
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
    this.travelJournalSvc
      .travelJournalSubmit(this.travelJournal, 'create')
      .subscribe(
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
}
