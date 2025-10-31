import { IngredientDTO } from './ingredient.dto';

export class RecipeDTO {
  feedId?: string;
  name: string = "";
  authorName: string = "";
  authorId: string = "";
  description: string = "";
  imageUrl?: string | null;
  image?: string | null; // base64 or null
  ingredients: IngredientDTO[] = [];
  instructions: string[] = [];
  mealType: string = "";
  dietaryRestrictions: string[] = [];
  origin: string = "";
  cookTime: number = 0;
  servings: number = 0;

  constructor(data: Partial<RecipeDTO>) {
    Object.assign(this, data);
  }

  static fromJSON(json: any): RecipeDTO {
    return new RecipeDTO({
      feedId: json.feedId,
      name: json.name,
      authorName: json.authorName,
      authorId: json.authorId,
      description: json.description,
      imageUrl: json.imageUrl ?? null,
      image: json.image ?? null,
      ingredients: (json.ingredients || []).map((i: any) => IngredientDTO.fromJSON(i)),
      instructions: json.instructions || [],
      mealType: json.mealType,
      dietaryRestrictions: json.dietaryRestrictions || [],
      origin: json.origin,
      cookTime: json.cookTime,
      servings: json.servings,
    });
  }

  toJSON() {
    return {
      feedId: this.feedId,
      name: this.name,
      authorName: this.authorName,
      authorId: this.authorId,
      description: this.description,
      imageUrl: this.imageUrl,
      image: this.image,
      ingredients: this.ingredients?.map(i => i.toJSON()),
      instructions: this.instructions,
      mealType: this.mealType,
      dietaryRestrictions: this.dietaryRestrictions,
      origin: this.origin,
      cookTime: this.cookTime,
      servings: this.servings,
    };
  }
}