import { BadRequestException, Injectable } from '@nestjs/common';
import { PdfService } from '../pdf/pdf.service';
import { TmdbService } from '../tmdb/tmdb.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly tmdbService: TmdbService,
  ) {}

  async popular() {
    const result = await this.tmdbService.getPopularMovies();
    return this.pdfService.generateMoviesPdf(result);
  }

  async one(id: string) {
    const result = await this.tmdbService.getMovie(id);
    if (!result) {
      throw new BadRequestException('Invalid data');
    }
    return await this.pdfService.generateMovieDetailsPdf(result);
  }
}
