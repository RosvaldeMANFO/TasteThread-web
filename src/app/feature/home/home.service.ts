import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { StatsModel } from "../../core/model/admin/stats.model";
import { RequestResult } from "../../core/model/requestResult.model";
import { environment } from "../../../environments/environment";
import { RecipeModel } from "../../core/model/recipe/recipe.model";
import { FilterDTO } from "./model/fileter.dto";
import { RecipeDTO } from "../../core/model/recipe/recipe.dto";
import { dataUrlToBlob } from "../../utils/file.utils";
import { map } from "rxjs";

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
        ).pipe(
            map(response => {
                return this.mapRecipe(response);
            })
        );
    }

    private mapRecipe(response: RequestResult<RecipeModel[]>) {
        let userEmail = sessionStorage.getItem('userEmail');
        if (response.data) {
            return {
                ...response,
                data: response.data.map(recipe => {
                    recipe.canEdit = recipe.author.email === userEmail;
                    return recipe;
                })
            };
        }
        return response;
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
        ).pipe(
            map(response => {
                return this.mapRecipe(response);
            })
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

    approveRecipe(recipeId: string) {
        return this.http.post<RequestResult<void>>(
            `${environment.apiUrl}/admin/approve/${recipeId}`,
            {},
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}