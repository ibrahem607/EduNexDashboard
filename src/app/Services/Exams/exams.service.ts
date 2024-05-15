import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/Environment/environment';
import { Observable } from 'rxjs';
import { IExam } from 'src/app/model/iexam';

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
