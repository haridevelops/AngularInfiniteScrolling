import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Movie } from './movie';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  movies = new BehaviorSubject([]);
  page: number = 0;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getMovies('popular');
  }

  getMovies(movieType: string) {
    this.movieService.getMovies(movieType, this.page=this.page+1).subscribe(
      (res: Array<Movie>) => {
        const newMovies = res;
        const oldMovies = this.movies.getValue();
        this.movies.next( _.concat(oldMovies, newMovies) );
      },
      (error: Error) => {
        console.log(error);
      },
      () => {
        console.log('completed');
        console.log(this.movies.getValue());
      }
    );
  }

  onScroll() {
    console.log('scrolled');
    this.getMovies('popular');
  }

}
