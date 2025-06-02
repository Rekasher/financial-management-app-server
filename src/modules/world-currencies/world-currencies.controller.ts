import { Controller, Get, Param} from '@nestjs/common';
import { WorldCurrenciesService } from './world-currencies.service';

@Controller('world-currencies')
export class WorldCurrenciesController {
  constructor(private readonly worldCurrenciesService: WorldCurrenciesService) {}


  @Get('latest')
  async getCurrencies() {
    return await this.worldCurrenciesService.getLatestCurrencyRate();
  }

  @Get(':currency/:date')
  async getCurrencyByDate(@Param('currency') currencies: string, @Param('date') date: Date) {
    return await this.worldCurrenciesService.getHistoricalCurrencyRate(currencies, date);
  }


  @Get(':date')
  async getCurrenciesByDate(@Param('date') date: Date) {
    return await this.worldCurrenciesService.getHistoricalCurrenciesRate(date);
  }

  @Get()
  async getCurrenciesNames() {
    return await this.worldCurrenciesService.getWordCurrenciesNames();
  }
}
