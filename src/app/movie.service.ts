import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operators/retry';
import { map } from 'rxjs/operators/map';

import { Movie } from "./movie";

@Injectable()
export class MovieService {

  tmdbEndpoint: string;
  apiKey: string;
  imagePrefix: string;
  searchEndpoint: string;

  constructor(private http: HttpClient) { 
    this.tmdbEndpoint = 'https://api.themoviedb.org/3/movie';
    this.apiKey = 'api_key=269ff5015d6a3b3ce62163dd525c8713';
    this.imagePrefix = 'https://image.tmdb.org/t/p/w500';
    this.searchEndpoint = 'https://api.themoviedb.org/3/search';
  }

  getMovies(type: string, page: number = 1): Observable<Array<Movie>> {
    const endPoint = `${this.tmdbEndpoint}/${type}?${this.apiKey}&page=${page}`;
    return this.http.get(endPoint)
      .pipe(
        retry(3),
        map(this.pickResultsFromResponse),
        map(this.transformPosterPath.bind(this)),
        map(this.transformIDtoMovieId.bind(this))
      );
  }

  transformIDtoMovieId(movies): Array<Movie>  {
    return movies.map(movie => {
      movie.movieId = movie.id;
      return movie;
    });
  }

  transformPosterPath(movies): Array<Movie> {
    return movies.map(movie => {
      movie.poster_path = `${this.imagePrefix}${movie.poster_path}`;
      return movie;
    });
  }

  pickResultsFromResponse(response) {
    console.log(response)
    return response['results'];
  }

  searchMovie(searchString: string): Observable<Array<Movie>> {
    const url = `${this.searchEndpoint}/movie?${this.apiKey}&&language=en-US&page=1&include_adult=false&query=${searchString}`;
    if(searchString.length>0) {
      return this.http.get(url).pipe(
        retry(3),
        map(this.pickResultsFromResponse),
        map(this.transformPosterPath.bind(this))
      );
    }
  }
}
