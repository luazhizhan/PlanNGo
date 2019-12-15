import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apisConfigs from '../../configs/apiConfigs';
import { httpConfigs } from 'src/app/configs/httpConfigs';
import TravelPlan from '../../interfaces/travelPlan';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelPlanService {

  constructor(private http: HttpClient) { }

  getTravelPlansByUserID(userID: number): Observable<any> {
    return this.http.get(apisConfigs.get.getTravelPlanByUserID + userID.toString(), httpConfigs);
  }

  createTravelPlan(travelPlan: TravelPlan): Observable<any> {
    const postData = JSON.stringify(travelPlan);
    return this.http.post(apisConfigs.post.createTravelPlan, postData, httpConfigs);
  }

  updateTravelPlanByTravelPlanID(travelPlan: TravelPlan): Observable<any> {
    const putData = JSON.stringify(travelPlan);
    return this.http.put(apisConfigs.put.updateTravelPlanByTravelPlanID, putData, httpConfigs);
  }

  delTravelPlanByIDs(travelPlanID: number, userID: number): Observable<any> {
    httpConfigs.body = {
      travelPlanID,
      userID
    };
    return this.http.delete(apisConfigs.delete.deleteTravelPlanByIDs, httpConfigs);
  }
}
