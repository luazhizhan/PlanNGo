import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apisConfigs from '../../configs/apiConfigs';
import { httpConfigs } from 'src/app/configs/httpConfigs';
import TravelPlan from '../../interfaces/travelPlan';
import { Observable, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelJournalService {

  constructor(private http: HttpClient) { }

  getTravelPlansByUserID(userID: number): Observable<any> {
    return this.http.get(apisConfigs.get.getTravelPlanByUserID + userID.toString(), httpConfigs);
  }

}
