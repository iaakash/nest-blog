import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
    
    async findByUsername(username: string): Promise<User> {
        // console.log('username', username);
        // const user_name = username.username;

        const userFromDbByUsername = await this.userModel.findOne({ username });
       
        return userFromDbByUsername
    }

    async updateUser(username, changes:any) {
        const userFromDbByUsername = await this.findByUsername(username);
        Object.keys(changes).map(key => {
            userFromDbByUsername[key] = changes[key];
          });
          const updatedUser = await userFromDbByUsername.save();
          console.log('updatedCourse', updatedUser);
          return updatedUser;
        //   return this.shapeCourse(updatedCourse);
      
        
    }
}
