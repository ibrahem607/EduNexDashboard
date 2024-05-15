import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExam } from 'src/app/model/iexam';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {
  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient) { }

  getAllExams(): Observable<IExam[]> {
    return this.httpClient.get<IExam[]>(`${this.URL}/api/Exams`);
  }
}
