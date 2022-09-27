import { Account, Session, RequestToken } from '../../interfaces';
import { Observable, map, BehaviorSubject, tap } from 'rxjs';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/data/constants.data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentSessionSubject: BehaviorSubject<Session | null>;
  currentSession: Observable<Session | null>;
  private currentAccountSubject: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);
  currentAccount: Observable<Account | null> = this.currentAccountSubject.asObservable();

  get session_id() {
    return JSON.parse(`${localStorage.getItem('session')}`);
  }

  constructor(private http: HttpClient) {
    const session = JSON.parse(`${localStorage.getItem('session')}`);
    this.currentSessionSubject = new BehaviorSubject<Session | null>(session)
    this.currentSession = this.currentSessionSubject.asObservable()
  }

  private apiKey: string = environment.apiKey;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    }),
    params: new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-MX')
  };

  getRequestToken(): Observable<RequestToken> {
    const options = { ...this.httpOptions };
    return this.http.get<RequestToken>(`${API_URL}/authentication/token/new`, options);
  }

  login(token: string): Observable<void> {
    return this.createSession(token)
      .pipe(
        map((session) => {
          localStorage.setItem('session', JSON.stringify(session.session_id))
          this.currentSessionSubject.next(session);
        })
      )
  }

  logout(session_id: string) {
    const options = { ...this.httpOptions, body: { session_id } };
    localStorage.removeItem('session');
    this.currentSessionSubject.next(null);
    this.currentAccountSubject.next(null);
    return this.http.delete<RequestToken>(`${API_URL}/authentication/session`, options);
  }

  getDataAccount() {
    let options = { ...this.httpOptions };

    const params = options.params.set('session_id', this.session_id);
    options.params = params;

    return this.http.get<Account>(`${API_URL}/account`, options)
      .pipe(
        tap(account => {
          this.currentAccountSubject.next(account);
        }),
      );
  }

  private createSession(request_token: string): Observable<Session> {
    const options = { ...this.httpOptions };

    return this.http.post<Session>(`${API_URL}/authentication/session/new`, { request_token }, options);
  }

}
