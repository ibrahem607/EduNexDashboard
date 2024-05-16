import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {

  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient) { }

  getAllWallets(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL}/GetALLWallets`);
  }

  generateCoupon(couponData: any): Observable<any[]> {
    return this.httpClient.post<any[]>(`${this.URL}/api/Coupon/generate`, couponData);
  }

  getWalletBalance(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/api/PurchaseLogs/CalculateBalance`);
  }
}
