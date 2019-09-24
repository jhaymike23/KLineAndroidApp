import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../services/auth-service.service';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { NavController, AlertController } from '@ionic/angular';
import {urls} from 'src/environments/environment';
import { LoadDataService } from '../services/load-data.service';
import {FiltercourseService} from '../services/filtercourse.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  scannedCode = null;
  scannedMatch: boolean = false;
  loggedUser = {};
  loginInformation: any;
  schedDetail:any;
  filterStatus:any;
  constructor(private barcodeScanner: BarcodeScanner,
              private auth: AuthServiceService,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadData : LoadDataService,
              private filter: FiltercourseService,
              private toastController: ToastController) {}

  async ngOnInit(){
    let logged = await this.auth.isLoggedIn();

    if (logged) {
      const data = await this.auth.getUser();
      this.loggedUser = JSON.parse(data);

      let parsedData = await this.auth.getUser();
      this.loginInformation = JSON.parse(parsedData).sched_code;
      
      console.log("info: " + this.loginInformation);
      return;
    } 

    this.navCtrl.navigateForward('/');
  }

  scanCode(){
    this.barcodeScanner.scan().then(barcodeData=>{
      console.log("scanned " + barcodeData.text);
      this.scannedCode = barcodeData.text;
      
      let datapost = JSON.stringify({
        scannedcode: this.scannedCode
      });
      this.filter.getDataCourse({scannedcode: this.scannedCode})
        .subscribe(data => {
          this.filterStatus = data.status;
          console.log(this.filterStatus);

          if(this.filterStatus == 1){
            this.showToast();
          }else{
            this.isScanned();
          }
        });      
    });
  }

  async isScanned(){ 

    if (this.scannedCode!=null){
      if (this.loginInformation == this.scannedCode){
        this.scannedMatch = true;
        let url:string = urls.loadData;
        let datapost = JSON.stringify({
          searchSched: this.scannedCode
        });
        this.loadData.getData({searchSched: this.scannedCode})
          .subscribe(data => {
          this.schedDetail = data.data;
            console.log("your data is" + "" + this.schedDetail);
          });
      }
      else{
        this.scannedMatch = false;
        const toast = await this.toastController.create({
          message: 'Sorry! You are not in this course',
          position: 'middle',
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present(); 
      }
    }    
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'The QR Code is not a KLMA Course',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
