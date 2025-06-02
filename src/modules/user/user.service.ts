import { Injectable, ConflictException } from '@nestjs/common';
import { database } from '../../db/db';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  async createUser(email: string, name: string, password: string): Promise<User> {
    // Check if user with email already exists
    const existingUserByEmail = await this.findUserByEmail(email);
    if (existingUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    // Check if user with name already exists
    const existingUserByName = await this.findUserByName(name);
    if (existingUserByName) {
      throw new ConflictException('User with this name already exists');
    }

    try {
      const user = await database.user.create({
        data: {
          email,
          name,
          password,
        },
      });

      // Create example data for the new user
      await this.createExampleData(user.id);

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  private async createExampleData(userId: number) {
    try {
      // Create example categories sequentially
      const categories: { id: number; category_name: string }[] = [];
      const categoryNames = ['Groceries', 'Transportation', 'Entertainment', 'Utilities', 'Health'];
      
      for (const name of categoryNames) {
        const category = await database.category.create({
          data: {
            category_name: name,
            user_id: userId,
            notification: true,
          },
        });
        categories.push(category);
      }

      // Create periods and related data for each category
      for (const category of categories) {
        // Create historical periods (last 3 months)
        for (let i = 3; i > 0; i--) {
          const startDate = new Date();
          startDate.setMonth(startDate.getMonth() - i);
          const endDate = new Date(startDate);
          endDate.setMonth(endDate.getMonth() + 1);

          const period = await database.period.create({
            data: {
              category_id: category.id,
              start_date: startDate,
              end_date: endDate,
              limit: category.category_name === 'Groceries' ? 500 : 
                     category.category_name === 'Transportation' ? 300 : 
                     category.category_name === 'Utilities' ? 400 :
                     category.category_name === 'Health' ? 600 : 200,
              repeate_date: 30,
              repeate_flag: false,
            },
          });

          // Create payments for this period
          const paymentAmounts = category.category_name === 'Groceries' ? 
            [150, 200, 100, 75, 120, 180] :
            category.category_name === 'Transportation' ? 
            [50, 75, 100, 45, 60, 80] :
            category.category_name === 'Utilities' ? 
            [120, 150, 180, 200, 160, 140] :
            category.category_name === 'Health' ? 
            [200, 150, 300, 250, 180, 220] :
            [80, 60, 40, 90, 70, 50];

          for (let j = 0; j < paymentAmounts.length; j++) {
            const paymentDate = new Date(startDate);
            paymentDate.setDate(paymentDate.getDate() + (j * 5));
            await database.payment.create({
              data: {
                period_id: period.id,
                money: -paymentAmounts[j],
                payment_name: `Example ${category.category_name.toLowerCase()} payment ${j + 1}`,
                payment_time: paymentDate,
                created_date: paymentDate,
                updated_date: paymentDate,
              },
            });
          }
        }

        // Create subscriptions based on category
        if (category.category_name === 'Entertainment') {
          await database.subscription.create({
            data: {
              category_id: category.id,
              subscription_name: 'Netflix',
              subscription_money: 16,
              currency: 'USD',
              payment_date: new Date(),
              period: 30,
              active: true,
            },
          });
          await database.subscription.create({
            data: {
              category_id: category.id,
              subscription_name: 'Spotify',
              subscription_money: 10,
              currency: 'USD',
              payment_date: new Date(),
              period: 30,
              active: true,
            },
          });
          await database.subscription.create({
            data: {
              category_id: category.id,
              subscription_name: 'Disney+',
              subscription_money: 8,
              currency: 'USD',
              payment_date: new Date(),
              period: 30,
              active: true,
            },
          });
        } else if (category.category_name === 'Transportation') {
          await database.subscription.create({
            data: {
              category_id: category.id,
              subscription_name: 'Public Transport Pass',
              subscription_money: 50,
              currency: 'USD',
              payment_date: new Date(),
              period: 30,
              active: true,
            },
          });
          await database.subscription.create({
            data: {
              category_id: category.id,
              subscription_name: 'Car Insurance',
              subscription_money: 120,
              currency: 'USD',
              payment_date: new Date(),
              period: 30,
              active: true,
            },
          });
        } else if (category.category_name === 'Utilities') {
          await database.subscription.create({
            data: {
              category_id: category.id,
              subscription_name: 'Electricity',
              subscription_money: 80,
              currency: 'USD',
              payment_date: new Date(),
              period: 30,
              active: true,
            },
          });
          await database.subscription.create({
            data: {
              category_id: category.id,
              subscription_name: 'Internet',
              subscription_money: 60,
              currency: 'USD',
              payment_date: new Date(),
              period: 30,
              active: true,
            },
          });
          await database.subscription.create({
            data: {
              category_id: category.id,
              subscription_name: 'Water',
              subscription_money: 40,
              currency: 'USD',
              payment_date: new Date(),
              period: 30,
              active: true,
            },
          });
        } else if (category.category_name === 'Health') {
          await database.subscription.create({
            data: {
              category_id: category.id,
              subscription_name: 'Gym Membership',
              subscription_money: 45,
              currency: 'USD',
              payment_date: new Date(),
              period: 30,
              active: true,
            },
          });
          await database.subscription.create({
            data: {
              category_id: category.id,
              subscription_name: 'Health Insurance',
              subscription_money: 200,
              currency: 'USD',
              payment_date: new Date(),
              period: 30,
              active: true,
            },
          });
        }
      }
    } catch (error) {
      console.error('Error creating example data:', error);
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await database.user.findUnique({ where: { email } });
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  async findUserByName(name: string): Promise<User | null> {
    try {
      return await database.user.findUnique({ where: { name } });
    } catch (error) {
      console.error('Error finding user by name:', error);
      throw error;
    }
  }

  async findUserById(id: number): Promise<User | null> {
    try {
      return await database.user.findUnique({ where: { id } });
    } catch (error) {
      console.error('Error finding user by id:', error);
      throw error;
    }
  }
}
