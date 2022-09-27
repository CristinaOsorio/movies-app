import { takeUntil, Subject } from 'rxjs';
import { CreateWatchlist } from './../../interfaces/watchlist.interface';
import { WatchlistService } from './../../services/watchlist/watchlist.service';
import { Account } from './../../interfaces/account.interface';
import { AuthService } from './../../services/auth/auth.service';
import { ImageDefault, Movie, Source } from '../../interfaces';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IMAGEN_URL } from 'src/app/data/constants.data';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() movie!: Movie;
  account!: Account | null;
  showImage = true;
  sources: Source[] = [];
  imageDefault!: ImageDefault;


  private onDestroy$ = new Subject<boolean>();

  constructor(private watchlistService: WatchlistService, private authService: AuthService) { }

  ngOnInit(): void {
    this.createSources();
    this.createImageDefault();
    this.authService.currentAccount
      .pipe(
        takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.account = data;
      })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  error(e: any) {
    e.target.onerror = null;
    this.showImage = false;
  }

  addWatchlist() {
    if (this.account) {
      const data: CreateWatchlist = {
        media_id: this.movie.id,
        media_type: 'movie',
        watchlist: true
      }

      this.watchlistService
        .addWatchlist(this.account.id, data)
        .subscribe(() => {
          alert(`La película ${this.movie.title} ha sido agregada a la lista.`)
        })

    }
  }

  createSources() {
    this.sources = [
      {
        media: '(max-width: 799px)',
        src: `${IMAGEN_URL}/w220_and_h330_face${this.movie.poster_path}`,
        width: 220
      },
      {

        media: '(min-width: 800px)',
        src: `${IMAGEN_URL}/w220_and_h330_face${this.movie.poster_path}`,
        width: 440
      }
    ];
  }

  createImageDefault() {
    this.imageDefault = {
      title: this.movie.title,
      src: `${IMAGEN_URL}/w220_and_h330_face${this.movie.poster_path}`
    };
  }
}

