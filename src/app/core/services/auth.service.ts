import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Token } from '../model/login.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'token';
    private readonly CREDENTIAL_KEY = 'credential';
    private readonly NEXT_DESTINATION = 'next'
    private tokenSubject = new BehaviorSubject<Token | null>(this.getToken());
    public token$ = this.tokenSubject.asObservable();

    constructor(private router: Router) {
        window.addEventListener('storage', (event) => {
            if (event.key === this.TOKEN_KEY && !event.newValue) {
                this.handleTokenCleared();
            }
        });
    }

    getToken(): Token | null {
        const token = sessionStorage.getItem(this.TOKEN_KEY);
        return token ? JSON.parse(token) : null;
    }

    setToken(token: Token): void {
        sessionStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
        this.tokenSubject.next(token);
    }

    removeToken(): void {
        sessionStorage.removeItem(this.TOKEN_KEY);
        this.tokenSubject.next(null);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    logout(): void {
        this.removeToken();
        this.router.navigate(['/login']);
    }

    setCredential(credential: any) {
        sessionStorage.setItem(this.CREDENTIAL_KEY, JSON.stringify(credential));
    }

    getCredential(): {
        email: string;
        password: string;
    } | null {
        const credential = sessionStorage.getItem(this.CREDENTIAL_KEY);
        return credential ? JSON.parse(credential) : null;
    }

     getNextDestination(): string | null {
        const next = sessionStorage.getItem(this.NEXT_DESTINATION);
        return next ? next : null;
    }

    setNextDestination(next: string): void {
        sessionStorage.setItem(this.NEXT_DESTINATION, next);
    }

    private handleTokenCleared(): void {
        this.tokenSubject.next(null);
        this.router.navigate(['/login']);
    }
}