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

const jwtModule =  JwtModule.register({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: '3600s' },
});

const mongooseModule = MongooseModule.forFeature([{ 
  name: User.name, 
  schema: UserSchema
}]);

@Module({
  imports: [mongooseModule,
  passportModule,
  jwtModule,
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [passportModule, JwtStrategy, mongooseModule]
})
export class AuthModule {}
