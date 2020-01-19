import { Injectable, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
    } else if ( type === 'create') {
      return this.http.post(apisConfigs.post.createTravelJournal, data, httpConfigs);
    }
  }

  removeTravelJournal(data): Observable<any> {
    httpConfigs.body = {
      travelJournalID: data.travelJournalID,
      userID: data.userID
    };
    return this.http.delete(apisConfigs.delete.removeTravelJournalByIDs, httpConfigs);
  }

  getWishListByTravelPlanID(travelPlanID) {
    return this.http.get(apisConfigs.get.getWishList + travelPlanID.toString(), httpConfigs);
  }
}
