import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';


@Module({
  imports:[ AuthModule], 
  controllers: [UserController, ProfileController,],
  providers: [UserService,]
})
export class UserModule {}
