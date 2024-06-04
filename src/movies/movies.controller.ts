import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Response } from 'express';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async getPopular(@Res({ passthrough: true }) res: Response) {
    const stream = await this.moviesService.popular();

    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="test.pdf"',
    });

    return new StreamableFile(stream);
  }

  @Get('/:id')
  async getOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const stream = await this.moviesService.one(id);
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="test.pdf"',
    });

    return new StreamableFile(stream);
  }
}
