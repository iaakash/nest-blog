import { Controller, Get, UseGuards, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDecorator } from 'src/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schema/user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {

    }

    @Get()
    @UseGuards(AuthGuard())
    findCurrentUser(@UserDecorator() user: User) {
        return this.userService.findByUsername(user.username);
    }

    @Put()
    @UseGuards(AuthGuard())
    updateUser(@UserDecorator() user: User, @Body() changes) {
        return this.userService.updateUser(user.username, changes);
    }
}
