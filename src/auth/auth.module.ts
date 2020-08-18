import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { JwtStrategy } from './jwt.strategy';

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

@Module({
  imports: [MongooseModule.forFeature([{ 
    name: User.name, 
    schema: UserSchema
  }]),
  passportModule,
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '3600s' },
  }),
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [passportModule, JwtStrategy]
})
export class AuthModule {}
