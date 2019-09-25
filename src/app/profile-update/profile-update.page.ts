import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.page.html',
  styleUrls: ['./profile-update.page.scss'],
})
export class ProfileUpdatePage implements OnInit {

  loginInformation : any;
  loggedUser = {};
  constructor(public auth :AuthServiceService,
              private navCtrl: NavController,
              private alertCtrl: AlertController) { }

  async ngOnInit(){
    let logged = await this.auth.isLoggedIn();

    if(logged){
      const data = await this.auth.getUser();
      this.loggedUser = JSON.parse(data);

      return;
    }
  }

  cancel(){
    this.presentAlertConfirm()
    
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Dou you really want to cancel ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.navCtrl.navigateBack("/tabs/tab1");
          }
        }
      ]
    });

    await alert.present();
  }
}
