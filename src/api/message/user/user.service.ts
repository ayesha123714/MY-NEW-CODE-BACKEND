// import {
//   Injectable,
//   BadRequestException,
//   UnauthorizedException,
//   NotFoundException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { UserEntity } from 'src/entity/user.entity';
// import * as bcrypt from 'bcrypt';
// import { UserLoginDto } from '../../../auth/dto/login.dto';
// import * as dotenv from 'dotenv';
// import { signUpDto } from '../../../auth/dto/signup.dto';

// dotenv.config();
// Injectable();
// @Injectable()
// export class UserService {
//   constructor(
//     private readonly jwtService: JwtService,
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>,
//   ) {}
//   async signUp(signUpDto: signUpDto): Promise<any> {
//     const { username, email, password } = signUpDto;
//     const emailInUse = await this.userRepository.findOne({
//       where: { email },
//     });
//     if (emailInUse) {
//       throw new BadRequestException('Email is already in use');
//     }
//     const hasedPassword = await bcrypt.hash(password, 10);
//     const newUser = this.userRepository.create({
//       email,
//       username,
//       password: hasedPassword,
//     });
//     await this.userRepository.save(newUser);
//     const payload = { username: newUser.username, sub: newUser.id };
//     const token = this.jwtService.sign(payload);
//     return {
//       message: 'user successfully registered',
//       user: newUser,
//     };
//   }

//   async login(userLoginDto: UserLoginDto): Promise<any> {
//     const { username, email, password } = userLoginDto;
//     const user = await this.userRepository.findOne({ where: { email } });
//     if (!user) {
//       throw new NotFoundException('Invalid email or password');
//     }
//     const IsMatch = await bcrypt.compare(password, user.password);
//     if (IsMatch) {
//       throw new UnauthorizedException('Invalid Password');
//     }
//     const payload = { username: user.username, userid: user.id };
//     const access_token = await this.jwtService.sign(payload);
//     const userId = user.id;
//     return { userId, password, email, access_token };
//   }



//   async getUserById(userId: string): Promise<any> {
//     const user = await this.userRepository.findOne({ where: { id: userId } });
//     if (!user) {
//       throw new NotFoundException('User with ID ${userId} not found');
//     }
//     return {
//       success: true,
//       message: 'user fetch successfully',
//       data: user,
//     };
//   }
//   async deleteUser(userId: string): Promise<any> {
//     const finduser = await this.userRepository.findOne({
//       where: { id: userId },
//     });
//     const user = await this.userRepository.delete(userId);
//     if (!finduser)
//       throw new NotFoundException('This user with ID ${userId} does not exist');

//     return {
//       success: true,
//       message: 'User deleted successfully',
//     };
//   }
//   async findAll(): Promise<any> {
//     return await this.userRepository.find();
//   }
// }












import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
 import { signUpDto } from '../../../auth/dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
 import { UserLoginDto } from '../../../auth/dto/login.dto';

@Injectable()
export class UserService {
  private readonly jwtsecret = 'JWT_SECRET';
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService) { }

  async signUp(signUpDto:signUpDto): Promise<UserEntity> {
    const { username, password } = signUpDto;
    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ username, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async login(userLoginDto:UserLoginDto) {
    const { username, password} = userLoginDto;
    const user = await this.userRepository.findOne({ where: { username } })
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, userid : user.id};
    const accessToken = await this.jwtService.signAsync(payload);
    return { user, accessToken };
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.jwtsecret);
      return decoded; 
    } catch (err) {
      return null; 
    }
  }

  async findById(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: {id:userId} });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId}} not found`);
    }
    return user;
  }

  async deleteUserById(userId: string): Promise<void> {
    const result = await this.userRepository.delete(userId);
    
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

}