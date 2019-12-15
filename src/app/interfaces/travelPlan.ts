export default interface TravelPlan {
    travelPlanID?: number;
    title: string;
    country: string;
    desc?: string;
    dateGoing: Date;
    dateReturning: Date;
    flightCode?: string;
    boardingTime?: Date;
    seatInfo?: number;
    flightReminder?: boolean;
    userID: number;
}