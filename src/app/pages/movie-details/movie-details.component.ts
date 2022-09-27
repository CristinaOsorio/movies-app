import { AuthService } from './../../services/auth/auth.service';
import { IMAGEN_URL } from 'src/app/data/constants.data';
import {
  Cast, ImageDefault,
  Account,
  CreateWatchlist,
  Movie,
  MovieDetails,
  Person,
} from 'src/app/interfaces';
import { MoviesService } from './../../services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { forkJoin, concatMap, Subject, takeUntil } from 'rxjs';
import { WatchlistService } from 'src/app/services/watchlist/watchlist.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie!: MovieDetails;
  recommendations: Movie[] = [];
  casts!: Cast;
  showImageMovie = true;
  account?: Account | null;

  private onDestroy$ = new Subject<boolean>();

  constructor(
    private movieService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private watchlistService: WatchlistService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        concatMap((params: ParamMap) => {
          const id = params.get('id');
          return forkJoin([
            this.movieService.searchMovieById(Number(id)),
            this.movieService.searchRecommendations(Number(id)),
            this.movieService.searchCastsByMovieId(Number(id))
          ])
        }),
        takeUntil(this.onDestroy$)
      ).subscribe(([details, recommendations, casts]) => {
        this.movie = details;
        this.recommendations = recommendations.results;
        this.casts = casts;
      });

    this.searchAccountCurrent();

  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  searchAccountCurrent() {
    this.authService.currentAccount
      .pipe(
        takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.account = data;
      })
  }

  addWatchlist() {
    if (this.account) {
      const data: CreateWatchlist = {
        media_id: this.movie.id,
        media_type: 'movie',
        watchlist: false
      }

      this.watchlistService
        .addWatchlist(this.account.id, data)
        .pipe(
          takeUntil(this.onDestroy$)
        )
        .subscribe(() => {
          alert(`La película ${this.movie.title} ha sido agregada a la lista.`)
        })
    }
  }

  loadImageMovie(image: string, size: 220 | 440) {
    const images = {
      220: `${IMAGEN_URL}/w220_and_h330_face${image}`,
      440: `${IMAGEN_URL}/w440_and_h660_face${image}`,
    }
    return images[size];
  }

  errorMovie(e: any) {
    e.target.onerror = null;
    this.showImageMovie = false;
  }

  errorCast(e: any) {
    e.target.onerror = null;
    e.target.src = 'assets/img/profile.png';
  }


  createImgDefaultCast(person: Person): ImageDefault {
    return {
      title: '',
      src: `${IMAGEN_URL}/w220_and_h330_bestv2${person.profile_path}`
    }
  }


  createSources() {
    return [
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
    return {
      title: this.movie.title,
      src: `${IMAGEN_URL}/w220_and_h330_face${this.movie.poster_path}`
    };
  }



}
