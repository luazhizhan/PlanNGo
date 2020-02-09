// export default interface WishList {
//   wishlistID?: number;
//   userID?: number;
//   travelPlanID?: number;
//   description?: string;
//   itineraryPlace?: string;
//   duration?: string;
//   url?: string;
//   likes?: number;
//   status?: number;
//   category?:string;
//   name?:string;
// }

export default interface WishList {
  wishlistID?: number;
  category:string;
  name:string;
  description:string;
  location?:string;
  url?:string;
  openingTime?:string;
  price?:number;
  travelPlanID?:number;
}