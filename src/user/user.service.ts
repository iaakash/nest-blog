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

        const userFromDbByUsername = await await this.userModel.findOne({ username }).populate('followers')
       
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

    async followUser(usernameToFollow, userWantsToFollow) {
        const userToFollowFromDb = await this.findByUsername(usernameToFollow);
        const userWantsToFollowFromDb = await this.findByUsername(userWantsToFollow.username);

        userToFollowFromDb.followersList.push(userWantsToFollow.id);
        userWantsToFollowFromDb.followingList.push(userToFollowFromDb.id);

        const profileRequested = await userToFollowFromDb.save();
        const currentUser = await userWantsToFollowFromDb.save();
        return await profileRequested.toProfile(currentUser);

        // return profileRequested.toP
        // return this.processUserProfileForView(profileRequested, currentUser);
        
    }

     processUserProfileForView(profileRequested, currentUser) {
        return {...profileRequested.toObject(), following: true};

    }
}
