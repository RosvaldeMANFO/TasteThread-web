import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
            `${this.apiUrl}/users/reset-password`, newPassword,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
    }
}