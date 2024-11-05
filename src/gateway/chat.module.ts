import { Module } from '@nestjs/common';
import { ChatGateway} from './chat.gateway';
import { UserModule } from 'src/api/message/user/user.module';
import { PassportModules } from 'src/passport/passport.module';
 import { MessageModule } from 'src/api/message/messages/message.module';
import { UserService } from 'src/api/message/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, MessageModule, PassportModules,JwtModule,
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [ChatGateway, UserService]
})
export class GatewayModule {}




// import { Module } from '@nestjs/common';
// import { UserModule } from 'src/auth/user.module';
// import { MyGateWay } from './gateway';
// import { UserService } from 'src/auth/user.service';
// import { MessageService } from 'src/api/message/message.service';
// import { JwtService } from '@nestjs/jwt';


// @Module({
//   imports: [UserModule,JwtService],
//   providers: [MyGateWay, UserService, MessageService,JwtService],
//   exports:[JwtService]
 
// })
// export class MyGateWayModule {}

// import { Module } from '@nestjs/common';
// import { UserModule } from 'src/auth/user.module';
// import { MyGateWay } from './gateway';
// import { MessageService } from 'src/api/message/message.service';


// @Module({
//   imports: [UserModule],  
//   providers: [MyGateWay, MessageService],
// })
// export class MyGateWayModule {}
// import { Module } from '@nestjs/common';
// import { UserModule } from 'src/api/message/user/user.module';
// import { PassportModules } from 'src/passport/passport.module';
// import { MessageModule } from 'src/api/message/messages/message.module';
// import { MyGateway } from './chat.gateway';

// @Module({
//   imports: [
//     UserModule,    
//     PassportModules,  
//     MessageModule,    
//   ],
//   providers: [MyGateway], 
// })
// export class GatewayModule {}


// import { Module } from '@nestjs/common';
// import { UserModule } from 'src/api/message/user/user.module';
// import { PassportModules } from 'src/passport/passport.module'// Corrected to PassportModule (singular)
// import { MessageModule } from 'src/api/message/messages/message.module';
// import { MyGateway } from './chat.gateway';

// @Module({
//   imports: [
//     UserModule,
//     PassportModules, // Ensure the name matches the module you have in your codebase
//     MessageModule,
//   ],
//   providers: [MyGateway],
// })
// export class GatewayModule {}







