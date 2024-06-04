import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { MovieDto } from 'src/tmdb/dto/Movie.dto';
import { PopularMovieDto } from 'src/tmdb/dto/PopularMovie.dto';
import { PassThrough } from 'stream';

@Injectable()
export class PdfService {
  generateMoviesPdf(movies: PopularMovieDto[]) {
    const doc = new PDFDocument();
    const stream = new PassThrough();

    doc.pipe(stream);

    movies.forEach((movie) => {
      doc
        .fontSize(18)
        .text(movie.title, {
          link: `${process.env.PUBLIC_BASE_URL}/movies/${movie.id}`,
          underline: true,
        })
        .fontSize(12)
        .text(`Release Date: ${movie.release_date}`)
        .text(`Vote Average: ${movie.vote_average}`)
        .moveDown();
    });

    doc.end();
    return stream;
  }

  async generateMovieDetailsPdf(movie: MovieDto) {
    const doc = new PDFDocument();
    const stream = new PassThrough();

    doc.pipe(stream);

    doc
      .fontSize(18)
      .text(movie.title)
      .fontSize(12)
      .text(`Release Date: ${movie.release_date}`)
      .text(`Vote Average: ${movie.vote_average}`)
      .moveDown();

    if (movie.poster_path) {
      const buffer = await this.getImageBuffer(movie.poster_path);
      doc.image(buffer, { fit: [500, 500], align: 'center' });
    }

    doc.end();
    return stream;
  }

  async getImageBuffer(poster_path: string) {
    const response = await fetch(
      `https://image.tmdb.org/t/p/w500${poster_path}`,
    );
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
}
