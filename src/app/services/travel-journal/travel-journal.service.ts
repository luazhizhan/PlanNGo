import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';
import { Observable } from 'rxjs';
import TravelJournal from 'src/app/interfaces/travelJournal';
import apisConfigs from 'src/app/configs/apiConfigs';
import { httpConfigs } from 'src/app/configs/httpConfigs';

@Injectable({
  providedIn: 'root'
})
export class TravelJournalService {
  constructor(private http: HttpClient) {}

  travelJournalSubmit(travelJournal: TravelJournal, type): Observable<any> {
    const data = JSON.stringify(travelJournal);
    debugger;
    if (type === 'update') {
      return this.http.post(apisConfigs.post.createTravelJournal, data, httpConfigs);
    } else if (type === 'create') {
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

  getTravelJournal(params: Object): Observable<any> {
    if (Object.keys(params).length > 0) {
      let query = apisConfigs.get.getTravelJournal;
      for (let param in params) {
        if (!query.includes('?')) {
          query += `?${param}=${params[param]}`;
        } else {
          query += `&${param}=${params[param]}`;
        }
      }
      return this.http.get(query, httpConfigs);
    } else {
      return this.http.get(apisConfigs.get.getTravelJournal, httpConfigs);
    }
  }
}
