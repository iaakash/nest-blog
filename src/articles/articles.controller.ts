import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from 'src/auth/user.decorator';
import { User } from 'src/user/schema/user.entity';

@Controller('articles')
export class ArticlesController {

    constructor(private articleService: ArticlesService) {}

    @Get()
    findArticles(){
        return this.articleService.getAllArticles();
    }

    @Get('/:id')
    findArticleById(@Param('id') id){
        return this.articleService.getArticleById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    createArticle(@UserDecorator() user: User, @Body() article, ) {
        return this.articleService.createArticle(user.id, article);
    }

} 
