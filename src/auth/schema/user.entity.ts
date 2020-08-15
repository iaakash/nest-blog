import { Document } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema()
export class User extends Document {

    @Prop() 
    username: string;

    @Prop() 
    email: string;

    @Prop() 
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);