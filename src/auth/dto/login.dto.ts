import { IsEmail, IsOptional, IsString ,} from 'class-validator';
export class UserLoginDto{
    @IsEmail()
    @IsOptional()
    email?:string;
    @IsString()
    username:string;
    @IsString()
    password:string;
}
