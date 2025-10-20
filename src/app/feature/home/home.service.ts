import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StatsModel } from "../../core/model/admin/stats.model";
import { RequestResult } from "../../core/model/requestResult.model";
import { environment } from "../../../environments/environment";
import { RecipeModel } from "../../core/model/recipe/recipe.model";
import { FilterDTO } from "./model/fileter.dto";

@Injectable({ providedIn: 'root' })
export class HomeService {

    constructor(private http: HttpClient) { }

    getStats() {
        return this.http.get<RequestResult<StatsModel>>(
            `${environment.apiUrl}/admin/stats`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }

    getRecipes(offset: number) {
        return this.http.get<RequestResult<RecipeModel[]>>(
            `${environment.apiUrl}/recipes`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    offset: offset.toString(),
                    limit: "20"
                }
            }
        );
    }


    searchRecipes(term: string, offset: number) {
        const filter: FilterDTO = {
            query: term,
            origin: term,
            mealType: term,
            dietaryRestrictions: [term],
            cookTime: parseInt(term) || undefined
        };
        return this.http.post<RequestResult<RecipeModel[]>>(
            `${environment.apiUrl}/recipes/search`,
            filter,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    offset: offset.toString(),
                    limit: "20"
                }
            }
        );
    }
}