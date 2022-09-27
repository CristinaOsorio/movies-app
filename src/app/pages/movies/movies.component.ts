import { AuthService } from './../../services/auth/auth.service';
import { Movie, Account } from '../../interfaces';
import { MoviesService } from './../../services/movies/movies.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {
  popular: Movie[] = [];
  now_playing: Movie[] = [];
  latest: Movie[] = [];
  upcoming: Movie[] = [];
  account?: Account | null;
  private onDestroy$ = new Subject<boolean>();

  constructor(private moviesService: MoviesService, private authService: AuthService) {

  }

  ngOnInit(): void {

    combineLatest([
      this.moviesService.searchMoviesByType('popular'),
      this.moviesService.searchMoviesByType('top_rated'),
      this.moviesService.searchMoviesByType('now_playing'),
      this.moviesService.searchMoviesByType('upcoming')
    ])
      .pipe(
        takeUntil(this.onDestroy$))
      .subscribe(([
        popular,
        latest,
        now_playing,
        upcoming,
      ]) => {
        this.popular = popular.results;
        this.latest = latest.results;
        this.now_playing = now_playing.results;
        this.upcoming = upcoming.results;
      })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}
