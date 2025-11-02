export class StatsModel {
  userCount: number = 0;
  recipeCount: number = 0;
  pendingRecipeCount: number = 0;

  constructor(data: Partial<StatsModel>) {
    Object.assign(this, data);
  }

  static fromJSON(json: any): StatsModel {
    return new StatsModel({
      userCount: json.userCount ?? 0,
      recipeCount: json.recipeCount ?? 0,
      pendingRecipeCount: json.pendingRecipeCount ?? 0,
    });
  }
}