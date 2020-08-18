import { Document } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

@Schema()
export class User extends Document {

    @Prop() 
    username: string;

    @Prop() 
    email: string;

    @Prop({default: ''}) 
    bio: string;

    @Prop({default: null}) 
    image: string;

    
    @Exclude()
    @Prop() 
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);