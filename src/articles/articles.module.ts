import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article, ArticleSchema } from './schema/article.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

const mongooseModule = MongooseModule.forFeature([{ 
  name: Article.name, 
  schema: ArticleSchema
}]);

@Module({
  imports:[mongooseModule, AuthModule],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
