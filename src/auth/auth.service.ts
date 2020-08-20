import { Injectable, UnauthorizedException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dtos/create-user.dto';
import 'dotenv/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>, private jwtService: JwtService
  ) {}

  async createUser(user: CreateUserDto) {
    console.log('user', user);
    try {
      const hash = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({
      username: user.username,
      email: user.email,
      password: hash,
    });
    
    const userCreated = await newUser.save();
    console.log('userCreated::', userCreated);
    let payloadToSign = {username: userCreated.username, email:userCreated.email, id: userCreated._id   };
    
      const token = this.jwtService.sign(payloadToSign);
      const userCreatedObj = userCreated.toObject();
  
      delete userCreatedObj['password'];
      delete userCreatedObj['__v'];
      delete userCreatedObj['_id'];
  
      let newUserToSend = {user:{...userCreatedObj, token,  id: userCreatedObj._id,  }};
      
      return newUserToSend;
    } catch (error) {
      throw new HttpException('Custom Error', HttpStatus.BAD_REQUEST);
    }
    
    }
    
  

  async loginUser(user) {
    const userFromDb = await this.userModel.findOne({ email: user.email });
    return new Promise((resolve, reject) => {
      // Load hash from your password DB.
      bcrypt.compare(user.password, userFromDb.password, (err, result) => {
          if(!result) {
              reject(new UnauthorizedException('Password did not match'));
          } else {
            let payloadToSign = {username: userFromDb.username, id: userFromDb._id, email: userFromDb.email  };
  

    const token = this.jwtService.sign(payloadToSign);

            let authenticatedUser = {...userFromDb.toObject(), id: userFromDb._id, token}
            delete authenticatedUser['password'];
            delete authenticatedUser['__v'];
            delete authenticatedUser['_id'];

            resolve(authenticatedUser);
          }
      });
    });
  }
}
