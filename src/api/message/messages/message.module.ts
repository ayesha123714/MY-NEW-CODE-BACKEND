import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageController } from './message.controller';
import { MessageService } from "./message.service";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/api/message/user/user.module";
import { UserEntity } from "src/entity/user.entity";
import { MessageEntity } from "src/entity/message.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, MessageEntity]), 
        PassportModule,
        UserModule,
    ],
    providers: [MessageService],
    exports: [MessageService],
    controllers: [MessageController], 
})
export class MessageModule {}
