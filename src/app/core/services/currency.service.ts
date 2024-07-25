import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl =
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  constructor(private http: HttpClient) {}

  currentExchange: any;

  getCurrency(currency: string[]): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  convert(
    fromCurrency: string,
    toCurrency: string,
    amount: number
  ): Observable<{ result: number }> {
    return this.http.get<any>(`${this.apiUrl}${fromCurrency}`).pipe(
      map((response) => {
        const rate = response.rates[toCurrency];
        return { result: amount * rate };
      })
    );
  }
}
