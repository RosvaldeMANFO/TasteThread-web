import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Login } from "../../core/model/login.model";
import { RequestResult } from "../../core/model/requestResult.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    login(email: string, password: string) {
        return this.http.post<RequestResult<Login>>(
            `${this.apiUrl}/auth/login`, { email, password }
        );
    }
}
