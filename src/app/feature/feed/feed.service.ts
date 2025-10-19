import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/development";
import { RequestResult } from "../../core/model/requestResult.model";
import { RecipeModel } from "../../core/model/recipe/recipe.model";
import { map } from "rxjs/operators";
import { recipeModelToFeed } from "./model/recipe.mapper";

@Injectable({ providedIn: 'root' })
export class FeedService {

    constructor(private http: HttpClient) { }

    getFeed() {
        return this.http.get<RequestResult<RecipeModel[]>>(
            `${environment.apiUrl}/recipes`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        ).pipe(
            map(
                res => (res.data ?? [])
                    .map(recipe => recipeModelToFeed(
                        recipe, null, false
                    ))
            )
        );
    }
}