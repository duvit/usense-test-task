import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CurrencyService } from '../../services/currency.service';
import { CurrencyCodes } from '../../../shared/enums/currency-codes.enum';
import { ExchangeRate } from '../../models/exchange-rate.model';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
  selectedCurrency1: string = CurrencyCodes.USD;
  selectedCurrency2: string = CurrencyCodes.UAH;
  amount1?: number;
  amount2?: number;
  currencies: string[] = [CurrencyCodes.USD, CurrencyCodes.EUR, CurrencyCodes.UAH];
  exchangeRates: ExchangeRate[] = [];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loadExchangeRates();
  }

  getFilteredCurrencies(exclude: string): string[] {
    return this.currencies.filter(currency => currency !== exclude);
  }

  getRate(currency: string): number {
    const currencyData = this.exchangeRates.find(item => item.cc === currency);
    return currencyData?.rate ?? 1;
  }

  onCurrencyChange(): void {
    this.updateAmounts();
  }

  onAmountChange(changedInput: 'amount1' | 'amount2'): void {
    this.updateAmounts(changedInput);
  }

  private loadExchangeRates(): void {
    this.currencyService.getAllCurrencyRates().subscribe({
      next: data => {
        this.exchangeRates = data;
        this.updateAmounts();
      },
      error: error => console.error('Error fetching exchange rates', error),
    });
  }

  private updateAmounts(changedInput?: 'amount1' | 'amount2'): void {
    const rate1 = this.getRate(this.selectedCurrency1);
    const rate2 = this.getRate(this.selectedCurrency2);

    if (changedInput === 'amount1' || changedInput === undefined) {
      this.amount2 = this.amount1 !== undefined
        ? this.roundToTwoDecimalPlaces((this.amount1 * rate1) / rate2)
        : undefined;
    }

    if (changedInput === 'amount2' || changedInput === undefined) {
      this.amount1 = this.amount2 !== undefined
        ? this.roundToTwoDecimalPlaces((this.amount2 * rate2) / rate1)
        : undefined;
    }
  }

  private roundToTwoDecimalPlaces(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
