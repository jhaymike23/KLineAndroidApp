import { Component } from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service';
import {urls} from 'src/environments/environment';
import {Platform, NavController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  loginInformation : any;
  loggedUser = {};
  constructor(public auth :AuthServiceService,
              public navCtrl: NavController) {}
  
  async ngOnInit(){
    let logged = await this.auth.isLoggedIn();

    if(logged){
      const data = await this.auth.getUser();
      this.loggedUser = JSON.parse(data);

      return;
    }
    this.navCtrl.navigateBack('/');
  }

  goToUpdatePage(){
    this.navCtrl.navigateForward("/profile-update");
  }
}
