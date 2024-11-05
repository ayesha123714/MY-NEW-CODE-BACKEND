import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/message/user/user.module';
import { PassportModules } from './passport/passport.module';
import { validate } from './env.validate';
import { UserEntity } from './entity/user.entity';
// import { MyGateway } from './gateway/chat.gateway';
import { ChatGateway } from './gateway/chat.gateway';
import { EntityModule } from './entity/entity.module';
import { MessageModule } from './api/message/messages/message.module';
import { UserService } from './api/message/user/user.service';
import { GatewayModule } from './gateway/chat.module';
import { ChatService } from './gateway/chat.services';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      expandVariables: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
    }),
    PassportModules,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Ayesha',
      database: 'socketdatabase',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([UserEntity]),
    EntityModule,
    PassportModules,
    HttpModule,
    MessageModule,
    GatewayModule
   
  ],
  controllers: [AppController],
  providers: [AppService,UserService,ChatService,ChatGateway
    // MyGateway,
  ]
 
})
export class AppModule {}