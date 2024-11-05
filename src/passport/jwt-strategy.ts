// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import * as dotenv from 'dotenv';
// import { UserEntity } from 'src/entity/user.entity';
// import { JwtPayload } from "src/auth/interface/jwt-payload-interface";
// dotenv.config();

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(
//     @InjectRepository(UserEntity)
//     private userRepository: Repository<UserEntity>,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET,
//     });
//   }

  
//   async validate(payload: JwtPayload): Promise<{ userId: string, username: string }> {
//     const { userId } = payload;
//     const user = await this.userRepository.findOne({
//       where: { id: userId },
//     });
  
//     if (!user) {
//       throw new UnauthorizedException('User not found');
//     }
//     return { userId: user.id, username: user.username };
//   }
// }

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserEntity } from 'src/entity/user.entity';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { JwtPayload } from 'src/auth/interface/jwt-payload-interface';
// import * as dotenv from 'dotenv';
// dotenv.config();

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(
//     @InjectRepository(UserEntity)
//     private userRepository: Repository<UserEntity>,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration : false,
//       secretOrKey: process.env.JWT_SECRET,
//     });
//   }

//   async validate(payload: JwtPayload): Promise<UserEntity> {
//     const { id } = payload;
//     const user = await this.userRepository.findOne({
//       where: { id },
//     });
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }



import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { UserEntity } from 'src/entity/user.entity';
import { JwtPayload } from 'src/auth/interface/jwt-payload-interface';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  
  async validate(payload: JwtPayload): Promise<{ userId: string, username: string }> {
    const { id } = payload;
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
  
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { userId: user.id, username: user.username };
  }
}
