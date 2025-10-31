import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { RequestResult } from "../../core/model/requestResult.model";

@Injectable({ providedIn: 'root' })
export class ResetPasswordService {

    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    resetPassword(token: string | undefined, newPassword: string) {
        return this.http.post<RequestResult<string>>(
            `${this.apiUrl}/users/reset-password`, 
            newPassword,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        ).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return throwError(() => ({
                        status: 401,
                        message: 'Password reset link has expired or is invalid. Please request a new one.'
                    }));
                }
                return throwError(() => ({
                    status: error.status,
                    message: error.error?.message || 'An error occurred while resetting password.'
                }));
            })
        );
    }
}