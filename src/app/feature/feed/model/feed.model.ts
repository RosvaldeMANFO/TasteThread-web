import { RecipeModel } from "../../../core/model/recipe/recipe.model";
import { Comment } from "./comment.model";

export class Feed {
  id: string = '';
  recipe: RecipeModel = new RecipeModel({});
  likeCount: number = 0;
  commentCount: number = 0;
  likes: string[] = [];
  comments: Comment[] = [];
  authorImageUrl?: string | null = null;
  isFavorite: boolean = false;
  isLiked: boolean = false;

  constructor(data?: Partial<Feed>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static fromJSON(json: any): Feed {
    return new Feed({
      id: json.id,
      recipe: json.recipe ? RecipeModel.fromJSON(json.recipe) : new RecipeModel({}),
      likeCount: json.likeCount ?? 0,
      commentCount: json.commentCount ?? 0,
      likes: json.likes || [],
      comments: (json.comments || []).map((c: any) => Comment.fromJSON(c)),
      authorImageUrl: json.authorImageUrl ?? null,
      isFavorite: json.isFavorite ?? false,
      isLiked: json.isLiked ?? false,
    });
  }

  toJSON() {
    return {
      id: this.id,
      recipe: this.recipe.toJSON(),
      likeCount: this.likeCount,
      commentCount: this.commentCount,
      likes: this.likes,
      comments: this.comments.map(c => c.toJSON()),
      authorImageUrl: this.authorImageUrl,
      isFavorite: this.isFavorite,
      isLiked: this.isLiked,
    };
  }
}