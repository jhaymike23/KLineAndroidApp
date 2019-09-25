import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {urls} from 'src/environments/environment';
import {Storage} from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  login(loginData: any): any{
    let data ={
      user: loginData.username,
      pass: loginData.password
    }

    return this.http.post(urls.login, data).toPromise();
  }

  setUser(userData: any): void{
    this.storage.set("user", JSON.stringify(userData));
  }

  getUser(): any{
    return this.storage.get("user");
  }

  async isLoggedIn(){
    return this.storage.get("user");
  }

  logout(){
    this.storage.clear();
  }
}
