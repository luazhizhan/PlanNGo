import { Injectable } from '@angular/core';
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  capturedPicURL: string;

  constructor(
    private http: HttpClient,
    private camera: Camera,
    private platform: Platform
  ) {}

  async takePicture(sourceType: PictureSourceType) {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    return this.camera
      .getPicture(cameraOptions)
      .then(async imageData => {
        if (this.platform.is('android')) {
          const base64Image = 'data:image/jpeg;base64,' + imageData;
          const currentFileName = imageData.substring(
            imageData.lastIndexOf('/') + 1
          );
          const currentPath = imageData.substring(
            0,
            imageData.lastIndexOf('/')
          );
          const fileData = [
            {
              originalData: base64Image,
            }
          ];
          return fileData;
        }
      })
      .catch(err => err.message);
  }
}
