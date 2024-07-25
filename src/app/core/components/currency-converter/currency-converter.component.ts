import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CurrencyService } from '../../services/currency.service';
import { CurrencyCodes } from '../../../shared/enums/currency-codes.enum';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  exchangeRates: { [key: string]: number } = {};

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getExchangeRates().subscribe((data: any[]) => {
      data.forEach(rate => {
        this.exchangeRates[rate.cc] = rate.rate;
      });
      this.calculateResult();
    });
  }

  getFilteredCurrencies(exclude: string): string[] {
    return this.currencies.filter((currency) => currency !== exclude);
  }

  calculateResult(): void {
    if (this.selectedCurrency1 && this.selectedCurrency2 && this.amount) {
      const rate1 = this.exchangeRates[this.selectedCurrency1];
      const rate2 = this.exchangeRates[this.selectedCurrency2];
      this.result = (this.amount * rate1) / rate2;
    }
  }
}
