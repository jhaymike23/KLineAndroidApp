import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {urls} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FiltercourseService {

  constructor(private http: HttpClient) { }
    
    getDataCourse(data : any) : any {
      return this.http.post(urls.filterQRCode, data);
    }
}
