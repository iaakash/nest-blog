import {IsString, MinLength, MaxLength, IsEmail} from 'class-validator';

export class CreateUserDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string; 

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password:string; 
}
