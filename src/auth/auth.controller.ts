import { Controller, Post, Body, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post()
    register(@Body(ValidationPipe) regsiterUserDto: CreateUserDto) {
        return this.authService.createUser(regsiterUserDto);
    }

    @Post('login') 
    loginUser(
        @Body() user:any
    ) {
        if (!user.email || !user.password) {
            throw new UnauthorizedException('Please Enter Email and Password');
        }
        const result = this.authService.loginUser(user);
        return result;
    }
}
