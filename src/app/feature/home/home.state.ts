import { StatsModel } from "../../core/model/admin/stats.model"
import { RecipeModel } from "../../core/model/recipe/recipe.model";
import { RecipeListState } from "./components/recipes/recipeList.state";

export class HomeState {
    isLoading: boolean = false
    stats?: StatsModel
    recipeListState: RecipeListState = new RecipeListState();
    error?: string
}