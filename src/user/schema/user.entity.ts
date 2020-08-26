import { Document } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';

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

    @Prop([{ type : mongoose.Schema.Types.ObjectId, ref: 'User', select: false }])
    followingList;

    @Prop([{ type : mongoose.Schema.Types.ObjectId, ref: 'User', select: false }])
    followersList;

    @Prop({default: false})
    following: boolean

    toProfile = function(user) {
        const following = this.followersList.includes(user.id);
        const profile = this.toJSON();
        delete profile.followingList;
        delete profile.followersList;
        return {profile: {...profile, following}};
    }
}

export const UserSchema = SchemaFactory.createForClass(User);



UserSchema.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });

