import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[MongooseModule.forFeature([{ 
    name: User.name, 
    schema: UserSchema
  }]), AuthModule], 
  controllers: [UserController, ProfileController,],
  providers: [UserService, JwtStrategy]
})
export class UserModule {}
