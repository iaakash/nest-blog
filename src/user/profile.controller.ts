import { Controller, Get, Param, NotFoundException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDecorator } from 'src/auth/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schema/user.entity';

@Controller('profiles')
export class ProfileController {

    constructor(private userService: UserService){}

    @Get('/:username')
    async getUserProfile(@Param('username') username: string) {

        const user = await this.userService.findByUsername(username);
        console.log('user', user);
        if(!user) {
            throw new NotFoundException(`User with ${username} not found`,);
        }else {
            return {profile: user};
        }
    }

    @Post('/:username/follow')
    @UseGuards(AuthGuard())
    followUser(@Param('username') username: string, @UserDecorator() user: User) {
        console.log('username:::', username);
        console.log('user:::', user);
        return this.userService.followUser(username, user);
    }
     
       
}
