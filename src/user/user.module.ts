import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthService } from './user.service';
import { UserAuthController } from './user.controller';
import { UserSchema } from 'src/schemas/user.schema';
import { secretKey } from 'src/config/config';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: secretKey.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserAuthService, UserRepository],
  controllers: [UserAuthController],
})
export class UserAuthModule {}
