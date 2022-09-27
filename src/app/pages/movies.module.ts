import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ComponentsModule } from '../components/components.module';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { WatchlistComponent } from './watchlist/watchlist.component';


@NgModule({
  declarations: [
    MoviesComponent,
    MovieDetailsComponent,
    SearchMoviesComponent,
    WatchlistComponent,
  ],
  imports: [
    InfiniteScrollModule,
    CommonModule,
    MoviesRoutingModule,
    ComponentsModule,
    PipesModule
  ],
})
export class MoviesModule { }
