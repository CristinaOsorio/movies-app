import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AuthService } from './../auth/auth.service';
import { CreateWatchlist, ResponseWatchlist, Search } from './../../interfaces';
import { API_URL } from 'src/app/data/constants.data';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private apiKey: string = environment.apiKey;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',

    }),
    params: new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-MX')
      .set('session_id', this.authService.session_id)
  };

  constructor(private authService: AuthService, private http: HttpClient) {

  }

  addWatchlist(account_id: number, data: CreateWatchlist) {
    return this.http.post<ResponseWatchlist>(`${API_URL}/account/${account_id}/watchlist`, data, this.httpOptions);
  }

  getWatchlist(account_id: number, page: number = 1): Observable<Search> {
    let options = { ...this.httpOptions };
    const params = options.params.set('sort_by', 'created_at.desc').set('page', page);
    options.params = params;

    return this.http.get<Search>(`${API_URL}/account/${account_id}/watchlist/movies`, options)
  }
}
