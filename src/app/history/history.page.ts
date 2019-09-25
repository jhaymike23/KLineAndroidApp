import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services/history.service';
import {AuthServiceService} from '../services/auth-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  items;
  
  loggedUserId: any;
  dataHistory: any;
  constructor(private history: HistoryService,
              private auth: AuthServiceService) { }

  async ngOnInit() {
    let logged = await this.auth.isLoggedIn();
    if (logged){
      let data = await this.auth.getUser();
      this.loggedUserId = JSON.parse(data).mem_id;

      console.log("your id is:" + this.loggedUserId);
      return;
    }
  }

  ionViewDidEnter(){
    this.getHistory();
    this.initializeItems();
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


  /////////////////////////////
  initializeItems() {
    /*this.items = [
      'John',
      'Michael',
      'Francisco',
      'Ataylar',
      'Mary',
      'Clarisse',
      'Riego',
      'Bangculeta',
    ];*/

    this.items =this.dataHistory;
  }

 
  getItems(event:any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item:any) => {
        return (item.history_course.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
