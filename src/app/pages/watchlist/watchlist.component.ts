import { CreateWatchlist } from './../../interfaces/watchlist.interface';
import { IMAGEN_URL } from 'src/app/data/constants.data';
import { AuthService } from './../../services/auth/auth.service';
import { mergeMap, of } from 'rxjs';
import { WatchlistService } from './../../services/watchlist/watchlist.service';
import { Movie, ImageDefault, Account } from 'src/app/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  movies: Movie[] = [];
  account!: Account;
  private page: number = 1

  constructor(
    private authService: AuthService,
    private watchlistService: WatchlistService
  ) { }

  ngOnInit(): void {
    this.searchWatchlist();
  }

  searchWatchlist() {
    this.authService.currentAccount
      .pipe(
        mergeMap(account => {
          if (account) {
            this.account = account;
            return this.watchlistService.getWatchlist(account.id)
          }
          return of(null)
        })
      ).subscribe(data => (this.movies = data ? data.results : []));
  }


  createImageDefault(movie: Movie): ImageDefault {
    return {
      title: movie.title,
      src: `${IMAGEN_URL}/w220_and_h330_face${movie.poster_path}`
    };
  }

  deleteWatchlist(movie: Movie) {
    if (this.account) {
      const data: CreateWatchlist = {
        media_id: movie.id,
        media_type: 'movie',
        watchlist: false
      }

      this.watchlistService
        .addWatchlist(this.account.id, data)
        .subscribe(() => {
          this.watchlistService.getWatchlist(this.account.id, this.page)
            .subscribe(data => (this.movies = data ? data.results : []))

          alert(`La película ${movie.title} ha sido eliminada de la lista.`)
        })

    }
  }

  onScroll() {
    this.page = this.page + 1;
    this.watchlistService.getWatchlist(this.account.id, this.page)
      .subscribe(data => (this.movies = [...this.movies, ...data.results]))
  }

}
