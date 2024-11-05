import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from '../../../auth/dto/login.dto';
import { signUpDto } from '../../../auth/dto/signup.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('signup')
  async signup(@Body() signupDato: signUpDto): Promise<any> {
    return await this.userService.signUp(signupDato);
  }
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return await this.userService.login(userLoginDto);
  }
  @Get()
  async getAllUsers(): Promise<any> {
    return await this.userService.findAll();
  }
}
