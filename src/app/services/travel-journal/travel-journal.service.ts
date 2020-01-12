import { Injectable, ChangeDetectorRef } from "@angular/core";
  Camera,
  CameraOptions,
  PictureSourceType
} from "@ionic-native/camera/ngx";
import { CameraService } from "../../services/camera/camera.service";
import { HttpClient } from "@angular/common/http";
import {
  ActionSheetController,
  ToastController,
  Platform,
  LoadingController
} from "@ionic/angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "../../services/auth/auth.service";
import { UtilsService } from "../../services/utils/utils.service";
import { Observable } from 'rxjs';
import TravelJournal from 'src/app/interfaces/travelJournal';
import apisConfigs from 'src/app/configs/apiConfigs';
import { httpConfigs } from 'src/app/configs/httpConfigs';

@Injectable({
  providedIn: "root"
})
export class TravelJournalService {
  constructor(
    private http: HttpClient
  ) {}

  travelJournalSubmit(travelJournal: TravelJournal, type): Observable<any> {
    const data = JSON.stringify(travelJournal);
    if (type === 'update') {
      return this.http.put(apisConfigs.post.createTravelJournal, data, httpConfigs);
    } else if ( type === 'create'){
      return this.http.post(apisConfigs.post.createTravelJournal, data, httpConfigs);
    }
  }

  getWishListByTravelPlanID(travelPlanID) {
    return this.http.get(apisConfigs.get.getWishList + travelPlanID.toString(), httpConfigs);
  }
}
