import { Controller, Post, Body, UsePipes, ValidationPipe, UnauthorizedException, UseFilters } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from 'src/shared/http-exception.filter';

@Controller('users')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post()
    @UseFilters(new HttpExceptionFilter())
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
