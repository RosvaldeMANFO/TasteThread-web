import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Login, LoginDTO } from "../../core/model/login.model";
import { RequestResult } from "../../core/model/requestResult.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private apiUrl: string;

    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    login(dto: LoginDTO) {
        return this.http.post<RequestResult<Login>>(
            `${this.apiUrl}/auth/login`, dto,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            }
        );
    }
}
