import { AuthResolver } from './../resolver/auth.resolver';
import { AuthGuard } from './../guards/auth.guard';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistComponent } from './watchlist/watchlist.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'all', component: MoviesComponent },
      { path: 'search', component: SearchMoviesComponent },
      {
        path: 'wacthlist',
        component: WatchlistComponent,
        canActivate: [AuthGuard]
      },
      { path: ':id', component: MovieDetailsComponent },
      { path: '**', redirectTo: 'all' }
    ],
    resolve: {
      session: AuthResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
