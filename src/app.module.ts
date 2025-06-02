import { Module } from '@nestjs/common';
import { WorldCurrenciesController } from './modules/world-currencies/world-currencies.controller';
import { WorldCurrenciesService } from './modules/world-currencies/world-currencies.service';
import { WordCurrenciesModule } from './modules/world-currencies/world-currencies.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { PeriodsModule } from './modules/periods/periods.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WordCurrenciesModule,
    AuthModule,
    UserModule,
    CategoriesModule,
    PaymentsModule,
    SubscriptionsModule,
    PeriodsModule,
  ],
  controllers: [WorldCurrenciesController, AuthController],
  providers: [WorldCurrenciesService],
})
export class AppModule {}
