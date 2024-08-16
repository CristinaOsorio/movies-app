import { Account, Session, RequestToken } from '../../interfaces';
import { Observable, map, BehaviorSubject, tap, of } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/data/constants.data';
import { LocalStorageService } from './../local-storage/local-storage.service';
import { AccountState } from './../../interfaces/account.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentSessionSubject: BehaviorSubject<Session | null>;
  currentSession: Observable<Session | null>;
  private currentAccountSubject: BehaviorSubject<Account | null> =
    new BehaviorSubject<Account | null>(null);
  currentAccount: Observable<Account | null> =
    this.currentAccountSubject.asObservable();

  get session_id() {
    return this.localStorageService.getItem('session');
  }

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.currentSessionSubject = new BehaviorSubject<Session | null>(
      this.session_id
    );
    this.currentSession = this.currentSessionSubject.asObservable();
  }

  private apiKey: string = environment.apiKey;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    params: new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-MX'),
  };

  getRequestToken(): Observable<RequestToken> {
    const options = { ...this.httpOptions };
    return this.http.get<RequestToken>(
      `${API_URL}/authentication/token/new`,
      options
    );
  }

  login(token: string): Observable<void> {
    return this.createSession(token).pipe(
      map((session) => {
        this.localStorageService.setItem('session', session.session_id);
        this.currentSessionSubject.next(session);
      })
    );
  }

  logout(session_id: string) {
    const options = { ...this.httpOptions, body: { session_id } };
    this.localStorageService.removeItem('session');
    this.currentSessionSubject.next(null);
    this.currentAccountSubject.next(null);
    return this.http.delete<RequestToken>(
      `${API_URL}/authentication/session`,
      options
    );
  }

  getDataAccount() {
    let options = { ...this.httpOptions };

    const params = options.params.set('session_id', this.session_id);
    options.params = params;

    return this.http.get<Account>(`${API_URL}/account`, options).pipe(
      tap((account) => {
        this.currentAccountSubject.next(account);
      })
    );
  }

  getAccountStates(movieId: number) {
    let options = { ...this.httpOptions };

      if (this.session_id) {

      const params = options.params.set('session_id', this.session_id);
      options.params = params;

      return this.http.get<AccountState>(
        `${API_URL}/movie/${movieId}/account_states`,
        options
      );

    }

    return of({
    id: 0,
    favorite: false,
    rated: false,
    watchlist: false,
  })
  }

  private createSession(request_token: string): Observable<Session> {
    const options = { ...this.httpOptions };

    return this.http.post<Session>(
      `${API_URL}/authentication/session/new`,
      { request_token },
      options
    );
  }
}
