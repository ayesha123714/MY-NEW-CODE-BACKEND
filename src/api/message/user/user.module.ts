// import{Module} from '@nestjs/common';
// import { UserController } from './user.controller';
// import{UserService} from './user.service';
// import { JwtModule, JwtService } from '@nestjs/jwt';
// import * as dotenv from 'dotenv';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from 'src/entity/user.entity';
// import { PassportModule } from '@nestjs/passport';


// dotenv.config()
// @Module({
//     imports:[
//         JwtModule.register({
//             secret:process.env.JWT_SCERET,
//             signOptions:{
//                 expiresIn:'90d',
//             },
//         }),
//         TypeOrmModule.forFeature([UserEntity]),PassportModule
        
//     ],
//     controllers:[UserController],
//     providers:[UserService,JwtService],
//      exports:[UserService,JwtService],
// })
// export class UserModule{}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from 'src/entity/user.entity';
import { PassportModules } from 'src/passport/passport.module';
import { EntityModule } from 'src/entity/entity.module';

@Module({
  imports: [EntityModule, PassportModules,TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}