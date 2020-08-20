import { Document } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';

@Schema()
export class User extends Document {

    @Prop({unique: true}) 
    username: string;

    @Prop({  index: true,
        unique: true}) 
    email: string;

    @Prop({default: ''}) 
    bio: string;

    @Prop({default: null}) 
    image: string;

    
    @Prop({type: String, select: false}) 
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });