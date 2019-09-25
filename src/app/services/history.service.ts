import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {urls} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getAllHistory(data: any) : any{
    return this.http.post(urls.history, data);
  }
}
