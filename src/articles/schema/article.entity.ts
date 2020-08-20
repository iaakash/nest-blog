import { Document, Mongoose } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import * as mongoose from 'mongoose';

@Schema()
export class Article extends Document {

    @Prop() 
    title;

    @Prop() 
    description;

    @Prop({ type: mongoose.Schema.Types.ObjectId,
        ref: 'User',})
    user
}

export const ArticleSchema = SchemaFactory.createForClass(Article);