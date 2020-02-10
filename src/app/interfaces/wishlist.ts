import { FormsModule } from '@angular/forms';

export default interface WishList {
    // Category: [{value1: "Food",value2: "Places of Interest"}];
    wishlistID?: number;
    category: string[];
    name: string;
    description: string;
    location: string;
    url?: string;
    openingTime: string;
    price?: number;
    travelPlanID?: number;
    userID:number;
  }


  