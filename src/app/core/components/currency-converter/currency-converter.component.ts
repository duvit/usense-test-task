import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyService } from '../../services/currency.service';
import { CurrencyCodes } from '../../../shared/enums/currency-codes.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule] ,
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent {
  selectedCurrency1: string = CurrencyCodes.USD;
  selectedCurrency2: string = CurrencyCodes.UAH;
  amount: number = 100;
  result: number | null = null;
  currencies: string[] = [
    CurrencyCodes.USD,
    CurrencyCodes.EUR,
    CurrencyCodes.UAH,
  ];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {}

  getFilteredCurrencies(exclude: string): string[] {
    return this.currencies.filter((currency) => currency !== exclude);
  }

  convertCurrency(): void {
    this.currencyService
      .convert(this.selectedCurrency1, this.selectedCurrency2, this.amount)
      .subscribe(
        (response) => {
          this.result = response.result;
        },
        (error) => {
          console.error('Error fetching conversion data', error);
        }
      );
  }
}
