import { Component } from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // eto lang
import { urls } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {AuthServiceService} from '../services/auth-service.service';
import { LoadDataService } from '../services/load-data.service';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  isClicked: boolean = true;
  dataHistory: any;
  loggedUserId= {};
  memberId:any;
  cart = [];
  items = [];
  public data = [
    {
      category: 'PDFs',
      expanded: false,
      pdf: [
        { id: 0, name: 'PDF 1'},
        { id: 1, name: 'PDF 2'},
        { id: 2, name: 'PDF 3'},
        { id: 3, name: 'PDF 4'}
      ]
    },
  ];
  constructor(private inAppBrowser: InAppBrowser,
              public navCtrl: NavController,
              private auth: AuthServiceService,
              private loadData : LoadDataService,
              private history: HistoryService) {}

  async ngOnInit(){
    let logged = await this.auth.isLoggedIn();
    if (logged){
      let data = await this.auth.getUser();
      this.loggedUserId = JSON.parse(data).mem_id;

      console.log("your id is:" + this.loggedUserId);
      return;
    }
  }

  downloadPDF(){
    let url = encodeURIComponent('http://www.tutorialspoint.com/ionic/ionic_tutorial.pdf');
    this.inAppBrowser.create('http://docs.google.com/viewer?url=' + url);
  }

  logout(){
    this.auth.logout();
    this.navCtrl.navigateBack('/login');
  }

  historyIsClicked(){
    this.isClicked = !this.isClicked;
    if(!this.isClicked){
      this.getHistory();
    }
    
  }

  getHistory(){
    let dataPostHistory = JSON.stringify({
      memberId: this.loggedUserId
    });

    this.history.getAllHistory({memberId: this.loggedUserId})
      .subscribe(data =>{
        this.dataHistory = data.data;
        console.log(this.dataHistory);
      });      
  }

  goToHistory(){
    this.navCtrl.navigateForward('/history');
  }
}
