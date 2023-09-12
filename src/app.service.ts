import { Injectable, OnModuleInit } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  async onModuleInit() {
    try {
      await mongoose.connect(process.env.MONGO_DB_URI, {
        dbName: process.env.DATABASE_NAME,
      });
      if (mongoose.connection.readyState === 1) {
        console.log('MongoDB connection successful');
      }
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
