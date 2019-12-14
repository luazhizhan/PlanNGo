import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  authForm: FormGroup;

  constructor(private navCtrl: NavController, private authSvc: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    }, {});
  }

  loginAuth(values) {
    if (this.authForm.invalid) {
      return alert('Please enter your username and password');
    }
    this.authSvc.login(values.username, values.pwd).subscribe(validUser => {
      if (validUser) {
        this.navCtrl.navigateForward('/tabs/home');
      } else {
        return alert('Wrong username or password');
      }
    });
  }
}
