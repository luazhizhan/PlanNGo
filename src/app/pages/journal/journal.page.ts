import { Component } from '@angular/core';
import User from 'src/app/interfaces/user';
import TravelJournal from 'src/app/interfaces/travelJournal';
import { TravelJournalService } from '../../services/travel-journal/travel-journal.service';
import { AuthService } from '../../services/auth/auth.service';
import { UtilsService } from '../../services/utils/utils.service';
import { ImageService } from '../../services/image/image.service';
import Image from 'src/app/interfaces/image';

@Component({
  selector: 'app-journal',
  templateUrl: 'journal.page.html',
  styleUrls: ['journal.page.scss']
})
export class JournalPage {
  user: User;
  journalList: TravelJournal[];
  imageList: Image[];
  loading = true;
  filterValue = 'all';
  categoryValue = 'Places of Interests';
  constructor(
    private authSvc: AuthService,
    private travelJournalSvc: TravelJournalService,
    private utilsSvc: UtilsService,
    private imageSvc: ImageService
  ) {}

   ionViewDidEnter() {
    this.user = this.authSvc.getUserInfo();
    const journalParams = {
      category: this.categoryValue
    };
    const imageParams = {};
    this.fetchTravelJournal(journalParams, imageParams);
  }

   ionViewDidLeave() {
    this.journalList = [];
    this.imageList = [];
  }

  async fetchTravelJournal(journalParams, imageParams) {
    this.loading = true;
    this.imageSvc.getImage(imageParams).subscribe(
      imageList => {
        // this.imageList = imageList.results;
        const images = imageList.results;
        this.imageList = images.map(image => {
          // const buf = image.image.data;
          const buf = image.image.split(`,`);
          let index = 0;
          // return
          // {
          // 	imageID: image.imageID,

          // 	description: image.description
          // }
          return {
            imageID: image.imageID,
            image: buf
              .map(imageBuf => {
                if (imageBuf.includes('data:image/jpeg;base64')) {
                  if(imageBuf.includes('[')){
                    if(buf[index+1].includes(']')){
                      imageBuf= `${imageBuf.substring(imageBuf.indexOf(`[`) + 1)},${buf[index + 1].substring(0, buf[index + 1].indexOf(']') - 1)}`
                    }else{
                      imageBuf= `${imageBuf.substring(imageBuf.indexOf(`[`) + 1)},${buf[index + 1]}`
                    }
                  }else if(buf[index + 1].includes(']')){
                    imageBuf=`${imageBuf},${buf[index + 1].substring(0, buf[index + 1].indexOf(']') - 1)}`
                  }else{
                    imageBuf=`${imageBuf},${buf[index + 1]}`;
                  }
                  index += 2;
                  return imageBuf.replace(/\"/g, '');
                }
              })
              .filter(image => image != undefined),
            description: image.description
          };
        });
        this.travelJournalSvc.getTravelJournal(journalParams).subscribe(
          journalList => {
            this.journalList = journalList.results.map(journal => {
              const date = new Date(journal.timestamp);
              const day = date.getDate();
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              return {
                ...journal,
                timestamp: `${day}/${month}/${year} ${date.toLocaleTimeString()}`,
                image: this.imageList
                  .filter(image => image.imageID === journal.imageID)
                  .map(obj => obj.image)
              };
            });
            this.loading = false;
          },
          async e => await this.utilsSvc.presentAsyncErrorToast(e)
        );
      },
      async e => await this.utilsSvc.presentAsyncErrorToast(e)
    );
  }

  async travelJournalClick(travelJournal: TravelJournal) {
    this.utilsSvc.navigateForward(
      {
        journal: JSON.stringify({
          travelJournalID: travelJournal.travelJournalID
        })
      },
      '/tabs/journal/journal-details/'
    );
    // const params = {
    // 	travelJournalID:journal.travelJournalID
    // };
    // this.travelJournalSvc.getTravelJournal(params).subscribe((journalList) => {
    // 	this.journalList = journalList.results;
    // 	this.loading = false;
    // }, async (e) => await this.utilsSvc.presentAsyncErrorToast(e));
  }

  arrayBufferToBase64 = buffer => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return binary;
    // return window.btoa(binary);
  };

  segmentChanged(ev: any) {
    this.categoryValue = ev.detail.value;
    const journalParams =
      this.filterValue === 'personal'
        ? {
            userID: this.user.userID,
            category: this.categoryValue
          }
        : {
            category: this.categoryValue
          };
    const imageParams = {};
    this.journalList = [];
    this.fetchTravelJournal(journalParams, imageParams);
  }

  filterSegmentChanged(ev: any) {
    this.filterValue = ev.detail.value;
    this.categoryValue = 'Places of Interests';
    const journalParams =
      this.filterValue === 'personal'
        ? {
            userID: this.user.userID,
            category: this.categoryValue
          }
        : {
            category: this.categoryValue
          };
    const imageParams = {};
    this.journalList = [];
    this.fetchTravelJournal(journalParams, imageParams);
  }
}
