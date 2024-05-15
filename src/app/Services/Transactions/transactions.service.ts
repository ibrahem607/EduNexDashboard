import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/Environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient) { }

  getAllTransactions(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL}/GetALLTransactions`);
  }
}
