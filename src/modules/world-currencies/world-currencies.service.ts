import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WorldCurrenciesService {
  private readonly latestCurrencyUrl: string;
  private readonly historicalCurrencyUrl: string;
  private readonly currenciesNames: string;

  constructor(private readonly configService: ConfigService) {
    this.latestCurrencyUrl = `${this.configService.get<string>('CURRENCY_URL')}/latest?${this.configService.get<string>('API_KEY')}`;
    this.historicalCurrencyUrl = `${this.configService.get<string>('CURRENCY_URL')}/historical?${this.configService.get<string>('API_KEY')}`;
    this.currenciesNames = `${this.configService.get<string>('CURRENCY_URL')}/currencies?${this.configService.get<string>('API_KEY')}`;
  }

  async getLatestCurrencyRate(): Promise<string> {
    try {
      const { data } = await fetch(this.latestCurrencyUrl).then((res) => res.json());
      return data;
    } catch (error) {
      throw new Error(`Failed to get currency rate: ${error}`);
    }
  }

  async getHistoricalCurrencyRate(currencies: string, date: Date): Promise<string> {
    try {
      const {data}  = await fetch(
        `${this.historicalCurrencyUrl}&currencies=${currencies}&date=${date}`,
      ).then((res) => res.json());

      return data;
    } catch (error) {
      throw new Error(`Failed to get currency rate: ${error}`);
    }
  }

  async getHistoricalCurrenciesRate(date: Date): Promise<string> {
    try {
      const { data }  = await fetch(
        `${this.historicalCurrencyUrl}&currencies=&date=${date}`,
      ).then((res) => res.json());

      return data;
    } catch (error) {
      throw new Error(`Failed to get currency rate: ${error}`);
    }
  }

  async getWordCurrenciesNames(): Promise<string> {
    try {
      const response = await fetch(
        `${this.currenciesNames}&currencies=`,
      ).then((res) => res.json());
      console.log("response", response);
      return response;
    } catch (error) {
      throw new Error(`Failed to get currency rate: ${error}`);
    }
  }

}