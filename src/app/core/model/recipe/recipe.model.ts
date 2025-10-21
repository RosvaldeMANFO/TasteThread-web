import { UserModel } from "../user/user.model";
import { RecipeCommentModel } from "./comment.model";
import { IngredientModel } from "./ingredient.model";
import { RecipeLikeModel } from "./like.model";

export class RecipeModel {
  id: string = "";
  name: string = "";
  author: UserModel = new UserModel();
  imageUrl?: string | null = null;
  mealType: string = "";
  description: string = "";
  dietaryRestrictions: string[] = [];
  country: string = "";
  cookTime: number = 0;
  servings: number = 0;
  ingredients: IngredientModel[] = [];
  instructions: string[] = [];
  comments: RecipeCommentModel[] = [];
  likes: RecipeLikeModel[] = [];
  approved: boolean = false;
  createdAt: number = Date.now();
  updatedAt: number = Date.now();
  canEdit: boolean = false;

  constructor(data: Partial<RecipeModel>) {
    Object.assign(this, {
      dietaryRestrictions: [],
      ingredients: [],
      instructions: [],
      comments: [],
      likes: [],
      ...data,
    });
  }

  static fromJSON(json: any): RecipeModel {
    return new RecipeModel({
      id: json.id,
      name: json.name,
      author: json.author,
      imageUrl: json.imageUrl ?? null,
      mealType: json.mealType,
      description: json.description,
      dietaryRestrictions: json.dietaryRestrictions || [],
      country: json.country,
      cookTime: json.cookTime,
      servings: json.servings,
      ingredients: (json.ingredients || []).map((i: any) => IngredientModel.fromJSON(i)),
      instructions: json.instructions || [],
      comments: (json.comments || []).map((c: any) => RecipeCommentModel.fromJSON(c)),
      likes: (json.likes || []).map((l: any) => RecipeLikeModel.fromJSON(l)),
      approved: json.approved ?? false,
      canEdit: json.canEdit ?? false,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      author: this.author,
      imageUrl: this.imageUrl,
      mealType: this.mealType,
      description: this.description,
      dietaryRestrictions: this.dietaryRestrictions,
      country: this.country,
      cookTime: this.cookTime,
      servings: this.servings,
      ingredients: this.ingredients?.map(i => i.toJSON()),
      instructions: this.instructions,
      comments: this.comments?.map(c => c.toJSON()),
      likes: this.likes?.map(l => l.toJSON()),
      approved: this.approved,
      canEdit: this.canEdit,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}