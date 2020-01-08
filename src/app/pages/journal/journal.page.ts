import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { File, IWriteOptions, FileEntry } from "@ionic-native/file/ngx";
import { Camera, CameraOptions, PictureSourceType } from "@ionic-native/camera/ngx";
import { CameraService } from "../../services/camera/camera.service";
import {
  ActionSheetController,
  ToastController,
  Platform,
  LoadingController
} from "@ionic/angular";

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';
import { TravelPlanService } from '../../services/travel-plan/travel-plan.service';
import { TravelJournalService } from '../../services/travel-journal/travel-journal.service';
import User from 'src/app/interfaces/user';
import TravelPlan from 'src/app/interfaces/travelPlan';

@Component({
  selector: "app-journal",
  templateUrl: "journal.page.html",
  styleUrls: ["journal.page.scss"]
})
export class JournalPage implements OnInit, AfterViewInit {
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  image: any;
  imageObj: any;

  journalForm: FormGroup;
  travelPlanTitle: string;
  travelPlanID: string;
  travelPlan: TravelPlan[];

  user: User;
  loading: boolean;

  constructor(
    private file: File,
    private cameraService: CameraService,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private travelPlanSvc: TravelPlanService,
    private authSvc: AuthService,
    private utilsSvc: UtilsService
  ) {
    
  }

  async ngOnInit() {
    this.journalForm = this.createForm();
    this.user = this.authSvc.getUserInfo();
    this.travelPlanSvc.getTravelPlansByUserID(this.user.userID).subscribe(
      travelPlans => {
        if (travelPlans.results) {
          this.travelPlan = travelPlans.results;
          this.loading = false;
          debugger;
        }
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e)
    );
    console.log(this.journalForm);
  }

  ngAfterViewInit() {}

  onSubmit() {}

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      formData.append("name", "Hello");
      formData.append("file", imgBlob, file.name);
      this.cameraService.uploadFile(formData).subscribe(dataRes => {
        console.log(dataRes);
      });
      reader.readAsArrayBuffer(file);
    };
  }

  async getCamera() {
    // const actionSheet = await this.actionSheetController.create({
    //   header: "Select Image source",
    //   buttons: [
    //     {
    //       text: "Load from Gallery",
    //       handler: () => {
    //         this.cameraService.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY).then(imageData => {
    //           this.image= imageData;
    //         });
    //       }
    //     },
    //     {
    //       text: "Use Camera",
    //       handler: () => {
    //         this.cameraService.takePicture(this.camera.PictureSourceType.CAMERA).then( imageData => {
    //           this.image = imageData;
    //         });
    //       }
    //     },
    //     {
    //       text: "Cancel",
    //       role: "cancel"
    //     }
    //   ]
    // });
    // await actionSheet.present();


    await this.cameraService.takePicture(this.camera.PictureSourceType.CAMERA).then(imageData => {
      console.log(imageData[0].originalData);
      this.imageObj = imageData;
      this.image = (window as any).Ionic.WebView.convertFileSrc(imageData[0].originalData);
    }, (err) => {
      console.log(err);
    });
    console.log(
      "image: " + this.imageObj[0].fileName + " path: " + this.imageObj[0].pathName
    );
  }

  dataURItoBlob(dataURI) {}

  createForm() {
    return new FormGroup({
      imageData: new FormControl(this.image),
      travelPlanTitle: new FormControl('', [Validators.required]),
      journalDetails: new FormControl('')
    });
  }
}
