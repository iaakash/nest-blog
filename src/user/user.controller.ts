import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {

    }

    @Get()
    @UseGuards(AuthGuard())
    findCurrentUser(@User() username: any) {
        return this.userService.findByUsername(username);
    }
}
