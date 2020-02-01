export default interface TravelJournal {
	travelJournalID?: number;
	title: string;
	location: string;
	imageID: number;
	journalDetails: Blob;
	timestamp: Date;
	userID: number;
	image?: Blob;
};
