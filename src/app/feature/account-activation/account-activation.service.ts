import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AccountActivationService {
    constructor(private http: HttpClient) { }

    activateAccount(token: string) {
        return this.http.post(`${environment.apiUrl}/users/activate`, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
    }
}