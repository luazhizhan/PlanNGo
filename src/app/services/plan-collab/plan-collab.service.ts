import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apisConfigs from '../../configs/apiConfigs';
import { httpConfigs } from 'src/app/configs/httpConfigs';
import PlanCollab from '../../interfaces/planCollab';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanCollabService {

  constructor(private http: HttpClient) { }

  getPlanCollabByTravelPlanID(travelPlanID: number): Observable<any> {
    return this.http.get(apisConfigs.get.getPlanCollabByTravelPlanID + travelPlanID.toString(), httpConfigs);
  }

  getPlanCollabUserDetailByTravelPlanID(travelPlanID: number): Observable<any> {
    return this.http.get(apisConfigs.get.getPlanCollabUserDetailByTravelPlanID + travelPlanID.toString(), httpConfigs);
  }

  addPlanCollab(planCollab: PlanCollab): Observable<any> {
    const postData = JSON.stringify(planCollab);
    return this.http.post(apisConfigs.post.addPlanCollab, postData, httpConfigs);
  }

  removePlanCollabByIds(travelPlanID: number, userID: number): Observable<any> {
    httpConfigs.body = {
      travelPlanID,
      userID
    };
    return this.http.delete(apisConfigs.delete.removePlanCollabByIds, httpConfigs);
  }
}
