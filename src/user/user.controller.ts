import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserAuthService } from './user.service';
import { User } from '../schemas/user.schema';
import { AuthGuard } from '../guard/auth.guard';
import { CreateUserDto } from 'src/DTO/user/create-user.dto';
import { LoginUserDto } from 'src/DTO/user/login-user.dto';

@Controller('api/users')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.userAuthService.registerUser(createUserDto);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ message: string; token: string }> {
    const token = await this.userAuthService.loginUser(loginUserDto);
    return { message: 'Login successful', token };
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUsers(): Promise<User[]> {
    return this.userAuthService.getUsers();
  }
}
