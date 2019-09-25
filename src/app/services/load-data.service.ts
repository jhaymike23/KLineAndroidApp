import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // eto lang
import { urls } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  constructor(private http : HttpClient) { }

  getData(data : any) : any {
    return this.http.post(urls.loadData, data);
  }
}
