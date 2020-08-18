import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
    
    async findByUsername(username: any): Promise<User> {
        console.log('username', username);
        const user_name = username.username;

        const userFromDbByUsername = await this.userModel.findOne({ username: user_name });
        console.log('userFromDbByUsername', userFromDbByUsername);
        return userFromDbByUsername
    }
}
