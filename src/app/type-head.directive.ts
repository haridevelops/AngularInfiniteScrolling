import { 
  Directive, 
  OnInit, 
  HostListener, 
  Output, 
  EventEmitter 
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {
  map,
  filter,
  concat,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { MovieService } from './movie.service';
import { Movie } from './movie';

@Directive({
  selector: '[appTypeHead]'
})
export class TypeHeadDirective implements OnInit {

  @Output() movies = new EventEmitter();

  private keyUp$ = new Subject<KeyboardEvent>();
  private key;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.listenAndSuggest(this.keyUp$);
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.key = (<HTMLTextAreaElement>event.target).value;
    this.keyUp$.next(event);
  }

  private listenAndSuggest(observable: Subject<KeyboardEvent>) {
    observable.pipe(
      map((e: Event) => (<HTMLTextAreaElement>event.target).value ),
      filter((text: string) => (text.trim().length > 2 && text !== '')),
      debounceTime(1000),
      distinctUntilChanged(),
      concat(),
      switchMap((e:any) => this.getMovies(e))
    ).subscribe((res: any) => {
      console.log(res);
    });
  }

  private getMovies(e): Observable<Array<Movie>> {
    return this.movieService.searchMovie(e);
  }

}
