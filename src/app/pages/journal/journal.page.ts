import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterContentInit
} from '@angular/core';
import { File, IWriteOptions, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from '@ionic-native/camera/ngx';
import { CameraService } from '../../services/camera/camera.service';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {
  ActionSheetController,
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';
import { TravelPlanService } from '../../services/travel-plan/travel-plan.service';
import { TravelJournalService } from '../../services/travel-journal/travel-journal.service';
import User from 'src/app/interfaces/user';
import TravelPlan from 'src/app/interfaces/travelPlan';
import TravelJournal from 'src/app/interfaces/travelJournal';
import { PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-journal',
  templateUrl: 'journal.page.html',
  styleUrls: ['journal.page.scss']
})
export class JournalPage implements OnInit {
  image: any;
  imageObj: any;

  journalForm: FormGroup;
  travelPlanID: string;
  // travelPlan: TravelPlan[];
  travelPlan: TravelPlan[];

  user: User;
  loading = true;

  travelJournal: TravelJournal;
  wishList: any;

  constructor(
    private popoverCtrl: PopoverController,
    private cameraService: CameraService,
    private travelPlanSvc: TravelPlanService,
    private travelJournalSvc: TravelJournalService,
    private authSvc: AuthService,
    private utilsSvc: UtilsService,
    private camera: Camera,
    private platform: Platform,
    private actionSheetController: ActionSheetController
  ) {}

  async ngOnInit() {
    this.journalForm = this.createForm();

    this.user = this.authSvc.getUserInfo();
    // this.travelPlanSvc.getTravelPlansByUserID(this.user.userID).subscribe(
    //   travelPlans => {
    //     debugger;
    //     if (travelPlans.results) {
    //       this.travelPlan = travelPlans.results;
    //       this.travelPlanTitle = travelPlans.results.title;
    //       this.loading = false;
    //     }
    //   },
    //   async e => await this.utilsSvc.presentAsyncErrorToast(e)
    // );

    this.travelPlanSvc
      .getTravelPlansByUserID(this.user.userID)
      .subscribe(res => {
        if (res && res.results) {
          this.travelPlan = res.results;
          this.loading = false;
        }
      });

    // this.travelJournalSvc.getWishListByTravelPlanID(this.travelPlan)

    this.journalForm.setValue({
      wishListItem: 'test',
      desc: '3+1 Image'
    });
    this.journalForm.updateValueAndValidity();
    // this.platform.ready().then(() => {
    //   this.travelJournalSvc.loadStoredImages(STORAGE_KEY);
    // });
  }

  createForm() {
    return new FormGroup({
      wishListItem: new FormControl(''),
      desc: new FormControl('')
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
      image: this.image,
      travelJournalID,
      userID,
      imageID
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
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [
        {
          text: 'Load from Gallery',
          handler: () => {
            this.cameraService
              .takePicture(this.camera.PictureSourceType.SAVEDPHOTOALBUM)
              .then(imageData => {
                console.log('image: ' + imageData[0].originalData);
                this.image = (window as any).Ionic.WebView.convertFileSrc(
                  imageData[0].originalData
                );
              });
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.cameraService
              .takePicture(this.camera.PictureSourceType.CAMERA)
              .then(imageData => {
                console.log('image: ' + imageData[0].originalData);
                this.image = (window as any).Ionic.WebView.convertFileSrc(
                  imageData[0].originalData
                );
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

    //   await this.cameraService.takePicture(this.camera.PictureSourceType.CAMERA).then(imageData => {
    //     console.log(imageData[0].originalData);
    //     this.imageObj = imageData;
    //     this.image = (window as any).Ionic.WebView.convertFileSrc(imageData[0].originalData);
    //   }, (err) => {
    //     console.log(err);
    //   });
    //   console.log(
    //     'image: ' + this.imageObj[0].fileName + ' path: ' + this.imageObj[0].pathName
    //   );
    // }
  }
}
