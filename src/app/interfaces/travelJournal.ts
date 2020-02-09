export default interface TravelJournal {
	travelJournalID?: number;
	wishListItem?: string;
	location?: string;
	imageID?: number;
	journalDetails?: string;
	timestamp?: Date;
	userID?: number;
	image?: Blob;
	category: string;
};
