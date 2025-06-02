import { Module } from '@nestjs/common';
import { WorldCurrenciesController } from './world-currencies.controller';
import { WorldCurrenciesService } from './world-currencies.service';

@Module({
  controllers: [WorldCurrenciesController],
  providers: [WorldCurrenciesService],
})
export class WordCurrenciesModule {}
