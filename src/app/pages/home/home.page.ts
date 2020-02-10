import { Component } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(private utilsSvc: UtilsService) {}

  onCountryClick(country: string) {
    this.utilsSvc.navigateForward(
      {
        country
      },
      '/tabs/plan/plan-form/'
    );
  }
}
