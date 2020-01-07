import { Injectable } from "@angular/core";
import { Camera, CameraOptions, PictureSourceType } from "@ionic-native/camera/ngx";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CameraService {
  capturedPicURL: string;

  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private http: HttpClient, private camera: Camera) {}

  uploadFile(formData) {
    return this.http.post("https://example.com/upload.php", formData);
  }

  takePicture(sourceType: PictureSourceType){
    const cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    return this.camera
      .getPicture(this.cameraOptions)
      .then(imageData => {
       //const base64Image = "data:image/jpeg;base64," + imageData;
       const currentFileName = imageData.substring(imageData.lastIndexOf('/') + 1);
       const currentPath = imageData.substring(0, imageData.lastIndexOf('/'));
       const fileData = [{
         originalData: imageData,
        fileName: currentFileName,
        pathName: currentPath
        }];
        return fileData;
      })
      .catch(err => err.message);
  }
}
