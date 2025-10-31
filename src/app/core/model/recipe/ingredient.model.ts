import { IngredientDTO } from "./ingredient.dto";

export class IngredientModel {
  id?: string;
  recipeId: string = "";
  name: string = "";
  quantity: number = 0;
  unit?: string | null;
  createdAt: number = Date.now();
  updatedAt: number = Date.now();

  constructor(data: {
    id?: string;
    recipeId?: string;
    name?: string;
    quantity?: number;
    unit?: string | null;
    createdAt?: number;
    updatedAt?: number;
  }) {
    Object.assign(this, data);
  }

  static fromJSON(json: any): IngredientModel {
    return new IngredientModel({
      id: json.id,
      recipeId: json.recipeId,
      name: json.name,
      quantity: json.quantity,
      unit: json.unit ?? null,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    });
  }

  toJSON() {
    return {
      id: this.id,
      recipeId: this.recipeId,
      name: this.name,
      quantity: this.quantity,
      unit: this.unit,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromDTO(dto: IngredientDTO, recipeId?: string): IngredientModel {
    return new IngredientModel({
      id: dto.id ?? '',
      recipeId: recipeId ?? '',
      name: dto.name,
      quantity: dto.quantity,
      unit: dto.unit ?? null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  }
}