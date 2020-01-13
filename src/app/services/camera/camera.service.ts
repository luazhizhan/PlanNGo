import { Injectable } from "@angular/core";
import {
  Camera,
  CameraOptions,
  PictureSourceType
} from "@ionic-native/camera/ngx";
import { HttpClient } from "@angular/common/http";
import { Platform } from "@ionic/angular";
import { FilePath } from "@ionic-native/file-path/ngx";
import { File } from "@ionic-native/file/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";

@Injectable({
  providedIn: "root"
})
export class CameraService {
  capturedPicURL: string;

  constructor(
    private http: HttpClient,
    private camera: Camera,
    private platform: Platform,
    private filePath: FilePath,
    private file: File,
    private androidPermissions: AndroidPermissions
  ) {}

  uploadFile(formData) {
    return this.http.post("https://example.com/upload.php", formData);
  }

  async takePicture(sourceType: PictureSourceType) {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    return this.camera
      .getPicture(cameraOptions)
      .then(async imageData => {
        if (
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY &&
          this.platform.is("android")
        ) {
          // await this.filePath.resolveNativePath(imageData).then(filePath => {
          //   debugger;
          //   const correctPath = filePath.substring(
          //     0,
          //     imageData.lastIndexOf("/") + 1
          //   );
          //   const currentName = filePath.substring(
          //     imageData.lastIndexOf("/") + 1
          //   );
          //   //const image = this.file.readAsDataURL(correctPath, currentName);
          //   //console.log(image);
          //   fileData = this.copyFileToLocalDir(
          //     correctPath,
          //     currentName,
          //     this.createFileName()
          //   );
          //   console.log('zzz' + fileData);
          // });
        } else if (
          sourceType === this.camera.PictureSourceType.CAMERA &&
          this.platform.is('android')
        ) {
          const base64Image = 'data:image/jpeg;base64,' + imageData;
          const currentFileName = imageData.substring(
            imageData.lastIndexOf("/") + 1
          );
          const currentPath = imageData.substring(
            0,
            imageData.lastIndexOf("/")
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
