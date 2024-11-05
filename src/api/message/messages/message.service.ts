import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from 'src/auth/dto/createMessage.dto';
import { MessageEntity } from 'src/entity/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
      ) {}
    
      async createMessage(createMessageDto: CreateMessageDto): Promise<MessageEntity> {
        const message = this.messageRepository.create(createMessageDto); // Create a new message instance
        return this.messageRepository.save(message); // Save the instance
      }
    
      async getAllMessages(): Promise<MessageEntity[]> {
        return this.messageRepository.find(); // Fetch all messages
      }
    }