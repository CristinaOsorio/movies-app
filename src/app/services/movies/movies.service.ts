import { API_URL } from 'src/app/data/constants.data';
import { Search, MovieDetails } from '../../interfaces/response-search.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Cast } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
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
      .set('sort_by', 'vote_average.desc')
  };

  constructor(private http: HttpClient) { }

  searchMoviesByType(type: string) {
    return this.http.get<Search>(`${API_URL}/movie/${type}`, this.httpOptions)
  }

  discoverMovieByGenderID(generID: string) {
    const options = { ...this.httpOptions };
    options.params.set('with_genres', generID);
    return this.http.get<Search>(`${API_URL}/discover/movie`, options)
  }

  searchMovieById(id: number): Observable<MovieDetails> {
    const options = { ...this.httpOptions };
    options.params.delete('sort_by');
    return this.http.get<MovieDetails>(`${API_URL}/movie/${id}`, options)
  }

  searchRecommendations(movie_id: number): Observable<Search> {
    const options = { ...this.httpOptions };
    return this.http.get<Search>(`${API_URL}/movie/${movie_id}/recommendations`, options)
  }

  searchCastsByMovieId(movie_id: number): Observable<Cast> {
    const options = { ...this.httpOptions };
    return this.http.get<Cast>(`${API_URL}/movie/${movie_id}/casts`, options)
  }

  searchByQuery(keyword: string, page: number = 1): Observable<Search> {
    let options = { ...this.httpOptions };
    const params = options.params.set('query', keyword).set('page', page);
    options.params = params;

    return this.http.get<Search>(`${API_URL}/search/movie`, options)
  }
}
