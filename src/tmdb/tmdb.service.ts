import { Injectable } from '@nestjs/common';
import { PopularMovieDto } from './dto/PopularMovie.dto';
import { TmdbResponse } from './types/tmdbResponseType';
import { MovieDto } from './dto/Movie.dto';

@Injectable()
export class TmdbService {
  async getPopularMovies(): Promise<PopularMovieDto[]> {
    try {
      const result = (await fetch(
        `${process.env.API_BASE_URL}/popular?` +
          new URLSearchParams({
            api_key: process.env.API_KEY,
          }),
      ).then((result) => {
        if (result.status !== 200) {
          return [];
        }
        return result.json();
      })) as TmdbResponse<PopularMovieDto[]>;
      return result.results;
    } catch (err) {
      console.error('Error getPopularMovies: ', err);
      throw err;
    }
  }

  async getMovie(id: string): Promise<MovieDto> {
    try {
      const result = (await fetch(
        `${process.env.API_BASE_URL}/${id}?` +
          new URLSearchParams({
            api_key: process.env.API_KEY,
          }),
      ).then((result) => {
        if (result.status !== 200) {
          return null;
        }
        return result.json();
      })) as MovieDto;
      return result;
    } catch (err) {
      console.error('Error getMovie: ', err);
      throw err;
    }
  }
}
