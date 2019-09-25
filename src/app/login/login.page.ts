import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import {Observable} from 'rxjs';
import {Storage} from '@ionic/storage';
import {AuthServiceService} from '../services/auth-service.service';
import {map} from 'rxjs/operators';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  logindata: any={};
  results : Observable<any>;
  openEye: boolean = true;
  constructor(
              private navCtrl: NavController,
              public auth: AuthServiceService,
              public storage: Storage,
              public httpClient: HttpClient,
              public httpClientModule: HttpClientModule,
              public alertController: AlertController
              ) { 
              this.logindata.username = "";
              this.logindata.password = "";
    }

  
  /**
   * Function for login
   * 
   * @return void
   */

  async loginData(){
    try{
      if(this.logindata.username != null || this.logindata.password != null){
        let returnedData = await this.auth.login(this.logindata);
        
        if(returnedData.status){
          this.auth.setUser(returnedData.data[0]);
          this.logindata.password = null;
          this.navCtrl.navigateForward('/tabs');
        }else {
  
          // error if returnedData is 0
          const alert = await this.alertController.create({
            header: 'Login error',
            message: 'unknown user',
            buttons: ['OK']
          });  
          alert.present();
        }
      } 
    }catch(error){
      const alert = await this.alertController.create({
          header: 'Login error',
          message: error,
          buttons: ['OK']
        });  
        alert.present();
      }
    
    
  }

  isEyeOpen(){
    this.openEye = !this.openEye;
  }

  async logging(){
    try{
      this.navCtrl.navigateForward(['/tabs']);
    }catch(error){
      const alert = await this.alertController.create({
        header: 'Login error',
        message: error,
        buttons: ['OK']
      });  
      alert.present();
    }    
  }
}
