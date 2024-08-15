import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

import { API_URL } from '../../data/constants.data';
import { Cast } from '../../interfaces';
import { Genre } from './../../interfaces/response-search.interface';
import {
  Search,
  MovieDetails,
} from '../../interfaces/response-search.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiKey: string = environment.apiKey;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-MX')
      .set('sort_by', 'vote_average.desc'),
  };

  constructor(private http: HttpClient) {}

  searchMoviesByType(type: string) {
    return this.http.get<Search>(`${API_URL}/movie/${type}`, this.httpOptions);
  }

  discoverMovieByGenderID(generID: string) {
    const options = { ...this.httpOptions };
    options.params.set('with_genres', generID);
    return this.http.get<Search>(`${API_URL}/discover/movie`, options);
  }

  discoverMovies(data?: { [key: string]: string | number }) {
    const options = { ...this.httpOptions };
    let params = options.params;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          params = params.set(key, value);
        }
      });
    }

    params = !params.has('page') ? params.set('page', 1) : params;
    params = !params.has('sort_by')
      ? params.set('sort_by', 'popularity.asc')
      : params;

    options.params = params;

    return this.http.get<Search>(`${API_URL}/discover/movie`, options);
  }

  searchMovieById(id: number): Observable<MovieDetails> {
    let options = {
      ...this.httpOptions,
      params: this.httpOptions.params.delete('sort_by'),
    };
    return this.http.get<MovieDetails>(`${API_URL}/movie/${id}`, options);
  }

  searchRecommendations(movie_id: number): Observable<Search> {
    const options = { ...this.httpOptions };
    return this.http.get<Search>(
      `${API_URL}/movie/${movie_id}/recommendations`,
      options
    );
  }

  searchCastsByMovieId(movie_id: number): Observable<Cast> {
    const options = { ...this.httpOptions };
    return this.http.get<Cast>(`${API_URL}/movie/${movie_id}/casts`, options);
  }

  searchByQuery(keyword: string, page?: number): Observable<Search> {
    let options = { ...this.httpOptions };
    const params = options.params.set('query', keyword).set('page', page || 1);
    options.params = params;

    return this.http.get<Search>(`${API_URL}/search/movie`, options);
  }

  getAllGenre(): Observable<Genre[]> {
    let options = { ...this.httpOptions };

    return this.http
      .get<{ genres: Genre[] }>(`${API_URL}/genre/movie/list`, options)
      .pipe(
        map((data) => data.genres),
        catchError(() => of([]))
      );
  }
}
