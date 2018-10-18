import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { MovieService } from "./movie.service";
import { TypeHeadDirective } from './type-head.directive';


@NgModule({
  declarations: [
    AppComponent,
    TypeHeadDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
