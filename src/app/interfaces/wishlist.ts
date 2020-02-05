import { FormsModule } from '@angular/forms';

export default interface WishList {
    // Category: [{value1: "Food",value2: "Places of Interest"}];
    wishlistID: number;
    Category: string[];
    Name: string;
    Description: string;
    Location: string;
    URL?: string;
    OpeningTime: string;
    Price?: number;
    travelPlanID: number;
  }


  