import { Controller,Get} from "@nestjs/common";
import { MessageService } from "./message.service";




@Controller('Message')
export class MessageController{
    constructor(private readonly messageService:MessageService){}
    @Get()
    async getMessages():Promise<any>{
        return await this.messageService.getAllMessages()
    }
}
