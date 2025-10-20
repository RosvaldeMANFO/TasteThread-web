import { RecipeModel } from "../../../core/model/recipe/recipe.model";

export class RecipeListState {
    isLoading: boolean = false;
    recipes: RecipeModel[] = [];
    error: string | null = null;
    searchTerm: string = '';
    selectedRecipe: RecipeModel | null = null;
}