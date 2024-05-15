import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {

  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient) { }

  getAllWallets(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL}/GetALLWallets`);
  }
}
