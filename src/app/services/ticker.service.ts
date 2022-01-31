import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TickerData } from '../models/Ticker';

@Injectable({
  providedIn: 'root',
})
export class TickerService {
  BASE_URL = 'https://feisty-lamp-338315.oa.r.appspot.com';

  constructor(private http: HttpClient) {}

  getTickerData(ticker: string): Observable<TickerData> {
    return this.http.get<TickerData>(`${this.BASE_URL}/ticker/${ticker}`);
  }
}
