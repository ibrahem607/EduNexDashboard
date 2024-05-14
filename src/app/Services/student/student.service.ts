import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  URL = 'http://localhost:5293'

  constructor(private httpClient: HttpClient) { }

 

  getAllStudent(): Observable<any> {
    return this.httpClient.get(`${this.URL}/students`);
  }

}
