import { UserModel } from "../user/user.model";

export class RecipeCommentModel {
  author?: UserModel;
  content: string = "";
  createdAt: number = Date.now();

  constructor(data: { author: UserModel; content: string; createdAt: number }) {
    Object.assign(this, data);
  }

  static fromJSON(json: any): RecipeCommentModel {
    return new RecipeCommentModel({
      author: json.author,
      content: json.content,
      createdAt: json.createdAt,
    });
  }

  toJSON() {
    return {
      author: this.author?.toJSON(),
      content: this.content,
      createdAt: this.createdAt,
    };
  }
}