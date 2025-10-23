import { LoginDTO } from "../../../core/model/login.model";
import { IngredientDTO } from "../../../core/model/recipe/ingredient.dto";
import { RecipeDTO } from "../../../core/model/recipe/recipe.dto";
import { RecipeModel } from "../../../core/model/recipe/recipe.model";
import { UserModel } from "../../../core/model/user/user.model";

import { Feed } from "./feed.model";
import { Comment as FeedComment } from "./comment.model";
import { longToLocalDateTime } from "../../../utils/datetime.util";




export function recipeModelToFeed(model: RecipeModel, userEmail: string | null): Feed {
  const likeUserNames: string[] = model.likes
    .map(l => l?.user?.name)
    .filter((n: any): n is string => typeof n === 'string');

  const comments: FeedComment[] = model.comments.map(c =>
    new FeedComment({
      author: c?.author?.name ?? '',
      content: c?.content ?? '',
      createdAt: longToLocalDateTime(c?.createdAt),
    })
  );

  const isLiked =
    !!userEmail && model.likes.some(l => (l?.user?.email as string | undefined) === userEmail);

  return new Feed({
    id: model.id,
    recipe: model,
    likeCount: model.likes.length,
    commentCount: comments.length,
    likes: likeUserNames,
    comments,
    authorImageUrl: (model.author as any)?.imageUrl ?? null,
    isLiked,
  });
}

export function recipeModelToDTO(model: RecipeModel): RecipeDTO {
  const ingredients: IngredientDTO[] = (model.ingredients ?? []).map((i: any) =>
    Object.assign(new IngredientDTO(), {
      id: i?.id,
      name: i?.name ?? '',
      quantity: typeof i?.quantity === 'number' ? i.quantity : 0,
      unit: i?.unit ?? '',
    })
  );

  return new RecipeDTO({
    feedId: model.id,
    authorName: model.author?.name ?? '',
    authorId: model.author?.id ?? '',
    name: model.name,
    origin: model.country,
    mealType: model.mealType,
    description: model.description,
    dietaryRestrictions: model.dietaryRestrictions ?? [],
    servings: model.servings,
    cookTime: model.cookTime,
    ingredients: ingredients,
    instructions: model.instructions ?? [],
    imageUrl: model.imageUrl ?? null,
  });
}