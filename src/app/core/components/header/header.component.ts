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

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.subscription = this.currencyService
      .getAllCurrencyRates()
      .subscribe({
        next: (data) => {
          this.usdRate = this.currencyService.getCurrencyRate(data, CurrencyCodes.USD);
          this.eurRate = this.currencyService.getCurrencyRate(data, CurrencyCodes.EUR);
        },
        error: (error) => console.error('Error fetching exchange rates', error),
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
