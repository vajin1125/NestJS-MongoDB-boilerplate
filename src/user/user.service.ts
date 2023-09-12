import {
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/DTO/user/create-user.dto';
import { LoginUserDto } from 'src/DTO/user/login-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserAuthService {
  private readonly logger = new Logger(UserAuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    try {
      const hash = await bcrypt.hash(createUserDto.password, 10);
      const entity = {
        ...createUserDto,
        password: hash,
        created_by: createUserDto.first_name + ' ' + createUserDto.last_name,
        created_at: new Date(),
      };
      // const userEntity = new this.userModel(entity);
      // await userEntity.save();
      await this.userRepository.create(entity);
      return { message: 'User registered successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<string> {
    try {
      const user = await this.userRepository.findOne({
        email: loginUserDto.email,
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const passwordMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid login credentials');
      }
      const payload = { userId: user._id };
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('An error occurred while logging in');
    }
  }

  async getUsers(params: Record<string, unknown> = {}): Promise<User[]> {
    try {
      return await this.userRepository.find(params);
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving users: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving users');
    }
  }
}
