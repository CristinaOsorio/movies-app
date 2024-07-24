import { Account } from '../../interfaces/account.interface';
import { APP_URL } from './../../data/constants.data';
import { AuthService } from './../../services/auth/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MoviesService, LocalStorageService } from './../../services';
import { map, mergeMap, of } from 'rxjs';

interface Suggestions {
  id: number;
  title: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  suggestions: Suggestions[] = [];
  account?: Account;
  isLogin = false;

  constructor(
    private moviesService: MoviesService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentSession
      .pipe(
        mergeMap((data) => {
          if (data) {
            this.isLogin = true;
            return this.authService.getDataAccount();
          }
          this.isLogin = false;
          return of();
        })
      )
      .subscribe((account) => {
        if (account) this.account = account;
      });
  }

  searchMovie(value: string) {
    this.suggestions = [];
    value = value.trim();
    const params: NavigationExtras = {
      queryParams: {
        query: value,
      },
    };
    this.router.navigate(['/movies/search'], value ? params : undefined);
  }

  getSuggestions(value: string) {
    value = value.trim();
    if (value) {
      this.suggestions = [];
      this.moviesService
        .searchByQuery(value)
        .pipe(
          map((data) => {
            const movies = data.results;
            return movies.splice(0, 5).map((movie) => {
              const year = new Date(movie.release_date).getFullYear();
              return {
                id: movie.id,
                title: `${movie.title} (${year})`,
              };
            });
          })
        )
        .subscribe((data) => {
          this.suggestions = data;
        });
    }

    this.suggestions = [];
  }

  login() {
    this.authService.getRequestToken().subscribe((response) => {
      window.location.href = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=${APP_URL}`;
    });
  }

  logout() {
    const sessionId = this.localStorageService.getItem('session');
    if (sessionId) {
      this.authService.logout(sessionId);
    }
    this.localStorageService.removeItem('session');
    this.router.navigate(['/movies/all']);
  }

  redirectTo(movieId: number) {
    this.suggestions = [];
    this.router.navigate(['/movies', movieId]);
  }
}
