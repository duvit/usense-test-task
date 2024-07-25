import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CurrencyService } from '../../services/currency.service';
import { CurrencyCodes } from '../../../shared/enums/currency-codes.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  usdRate: number | null = null;
  eurRate: number | null = null;

  private subscription: Subscription | null = null;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.subscription = this.currencyService
      .getCurrency([CurrencyCodes.USD, CurrencyCodes.EUR])
      .subscribe({
        next: (data) => {
          this.usdRate = this.getRate(data, CurrencyCodes.USD);
          this.eurRate = this.getRate(data, CurrencyCodes.EUR);
          console.log(data, this.usdRate, this.eurRate);
        },
        error: (error) => console.error('Error fetching exchange rates', error),
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getRate(data: any[], currency: string): number | null {
    const currencyData = data.find((item) => item.cc === currency);
    return currencyData ? currencyData.rate : null;
  }
}
