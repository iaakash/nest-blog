import { Controller, Get, Param, NotFoundException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

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
}
