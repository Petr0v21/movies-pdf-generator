import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { PdfModule } from 'src/pdf/pdf.module';
import { TmdbModule } from 'src/tmdb/tmdb.module';
import { MoviesController } from './movies.controller';

@Module({
  imports: [TmdbModule, PdfModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
