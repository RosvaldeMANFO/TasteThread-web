import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, take, switchMap, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Token } from './model/login.model';
import { RequestResult } from './model/requestResult.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private http: HttpClient) {}

  private isRefreshing = false;
  private tokenSubject = new BehaviorSubject<Token | null>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: Token = JSON.parse(sessionStorage.getItem('token') || 'null');
    let authReq = req;
    if (token) {
      authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token.accessToken}` }});
    }

    return next.handle(authReq).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401 && !req.url.includes('/auth/refresh')) {
          return this.handle401(authReq, next);
        }
        return throwError(() => err);
      })
    );
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.tokenSubject.next(null);

      return this.refreshToken().pipe(
        switchMap((newToken: Token) => {
          this.isRefreshing = false;
          this.tokenSubject.next(newToken);
          const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${newToken.accessToken}` }});
          return next.handle(cloned);
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.clearTokens();
          return throwError(() => err);
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token.accessToken}` }});
          return next.handle(cloned);
        })
      );
    }
  }

  refreshToken(): Observable<Token> {
        const token: Token = JSON.parse(sessionStorage.getItem('token') || '{}');
        return this.http.post<RequestResult<Token>>(
            `${environment.apiUrl}/auth/refresh`,
            token.refreshToken,
            {
                headers: { 'Content-Type': 'text/plain' },
                withCredentials: false
            }
        ).pipe(
            map(r => r.data as Token),
            tap(token => {
                sessionStorage.setItem('token', JSON.stringify(token));
            }),
        );
    }

    clearTokens() {
        sessionStorage.removeItem('token');
    }
}