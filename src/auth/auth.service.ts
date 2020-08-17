import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dtos/create-user.dto';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const hash = await bcrypt.hash(user.password, 10);
    console.log('hash', hash);
    const newUser = new this.userModel({
      username: user.username,
      email: user.email,
      password: hash,
    });
    console.log('hash', hash);
    const userCreated = await newUser.save();

    return userCreated;
  }

  async loginUser(user) {
    const userFromDb = await this.userModel.findOne({ email: user.email });
   console.log(userFromDb);
    return new Promise((resolve, reject) => {
      // Load hash from your password DB.
      bcrypt.compare(user.password, userFromDb.password, (err, result) => {
          if(!result) {
              reject(new UnauthorizedException('Password did not match'));
          } else {
            const token = jwt.sign({ email: userFromDb.email }, 'gdtgdg334fffwdef');
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
