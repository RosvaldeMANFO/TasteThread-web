import { RecipeModel } from "../../../../core/model/recipe/recipe.model";
import { Feed } from "../../model/feed.model";

export class RecipeListState {
    isLoading: boolean = false;
    recipes: RecipeModel[] = [];
    error: string | null = null;
    searchTerm: string = '';
    selectedFeed: Feed | null = null;
}