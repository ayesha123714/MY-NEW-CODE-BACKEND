import { IsString,IsNotEmpty } from "class-validator";
export class CreateMessageDto{
    @IsNotEmpty()
    @IsString()
    id:string;

    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsString()
    content: string;




}