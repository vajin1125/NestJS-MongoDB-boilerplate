import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthService } from './user.service';
import { UserAuthController } from './user.controller';
import { UserSchema } from 'src/schemas/user.schema';
import { secretKey } from 'src/config/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: secretKey.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserAuthService],
  controllers: [UserAuthController],
})
export class UserAuthModule implements NestModule {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  configure(_consumer: MiddlewareConsumer) {}
}
