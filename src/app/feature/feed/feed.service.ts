import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/development";
import { RequestResult } from "../../core/model/requestResult.model";
import { RecipeModel } from "../../core/model/recipe/recipe.model";
import { map } from "rxjs/operators";
import { recipeModelToFeed } from "./model/recipe.mapper";
import { RecipeDTO } from "../../core/model/recipe/recipe.dto";
import { dataUrlToBlob } from "../../utils/file.utils";

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

    createRecipe(recipe: RecipeDTO) {
        if (recipe.image) {
            const form = new FormData();

            const { image, ...rest } = recipe as any;
            form.append('recipe', JSON.stringify(rest));

            const imageBlob = dataUrlToBlob(recipe.image);
            form.append('image', imageBlob, 'image.jpg');

            return this.http.post<RequestResult<RecipeModel>>(
                `${environment.apiUrl}/recipes`,
                form,
            );
        }

        return this.http.post<RequestResult<RecipeModel>>(
            `${environment.apiUrl}/recipes`,
            recipe,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}