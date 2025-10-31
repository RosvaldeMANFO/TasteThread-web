import { UserModel } from "../user/user.model";

export class RecipeLikeModel {
  user?: UserModel;
  recipeId: string = "";
  createdAt: number = Date.now();

  constructor(data?: { user?: UserModel; recipeId?: string; createdAt?: number }) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static fromJSON(json: any): RecipeLikeModel {
    return new RecipeLikeModel({
      user: json.user ? UserModel.fromJSON(json.user) : undefined,
      recipeId: json.recipeId,
      createdAt: json.createdAt,
    });
  }

  toJSON() {
    return {
      user: this.user?.toJSON(),
      recipeId: this.recipeId,
      createdAt: this.createdAt,
    };
  }
}