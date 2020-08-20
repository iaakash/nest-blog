import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Article } from './schema/article.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
  ) {}

  async createArticle(userId, article) {
    console.log('article', article);
    const newArticle = new this.articleModel({
      description: article.description,
      title: article.title,
      user: userId
    });
    const articleCreated = await newArticle.save();
    return articleCreated;
  }

  async getArticleById(id) {
    const article = await this.articleModel.find({_id: id}).populate('user');
    return article;
  }

  async getAllArticles() {
    const articles = await this.articleModel.find().populate('user');
    return articles;
  }

}
