import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ExchangeRate } from '../models/exchange-rate.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  constructor(private http: HttpClient) { }


  getAllCurrencyRates(): Observable<ExchangeRate[]> {
    return this.http.get<ExchangeRate[]>(this.apiUrl);
  }

  getCurrencyRate(data: ExchangeRate[], currency: string): number | null {
    const currencyData = data.find((item) => item.cc === currency);
    return currencyData ? currencyData.rate : null;
  }

}
