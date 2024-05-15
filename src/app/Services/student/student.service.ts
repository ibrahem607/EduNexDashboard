import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient) { }

  getAllStudent(): Observable<any> {
    return this.httpClient.get(`${this.URL}/students`);
  }

}
