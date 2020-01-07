export default interface WishList {
  wishlistID?: number;
  userID: number;
  travelPlanID?: number;
  description?: string;
  itineraryPlace: string;
  duration?: string;
  url?: string;
  likes: number;
  status: number;
}
