import { LoginDTO } from "../../../core/model/login.model";
import { IngredientDTO } from "../../../core/model/recipe/ingredient.dto";
import { RecipeDTO } from "../../../core/model/recipe/recipe.dto";
import { RecipeModel } from "../../../core/model/recipe/recipe.model";
import { UserModel } from "../../../core/model/user/user.model";

import { Feed } from "./feed.model";
import { Comment as FeedComment } from "./comment.model";
import { longToLocalDateTime } from "../../../utils/datetime.util";




export function recipeModelToFeed(model: RecipeModel): Feed {
  const likes: any[] = Array.isArray((model as any).likes) ? (model as any).likes : [];
  const commentsRaw: any[] = Array.isArray((model as any).comments) ? (model as any).comments : [];

  const likeUserNames: string[] = likes
    .map(l => l?.user?.name)
    .filter((n: any): n is string => typeof n === 'string');

  const comments: FeedComment[] = commentsRaw.map(c =>
    new FeedComment({
      author: c?.author?.name ?? '',
      content: c?.content ?? '',
      createdAt: longToLocalDateTime(c?.createdAt),
    })
  );

  const userEmail = sessionStorage.getItem('userEmail') || '';
  const isLiked =
    !!userEmail && likes.some(l => (l?.user?.email as string | undefined) === userEmail);

  return new Feed({
    id: model.id,
    recipe: model,
    likeCount: likes.length,
    commentCount: comments.length,
    likes: likeUserNames,
    comments,
    authorImageUrl: (model.author as any)?.imageUrl ?? null,
    isLiked,
    canEdit: model.author.email === userEmail
  });
}

export function recipeModelToDTO(
  model: RecipeModel,
  image?: string | ArrayBuffer | Blob | null
): RecipeDTO {
  const ingredients: IngredientDTO[] = (model.ingredients ?? []).map((i: any) =>
    Object.assign(new IngredientDTO(), {
      id: i?.id,
      name: i?.name ?? '',
      quantity: typeof i?.quantity === 'number' ? i.quantity : 0,
      unit: i?.unit ?? '',
    })
  );

  return {
    authorName: model.author?.name ?? '',
    authorId: model.author?.id ?? '',
    feedId: model.id,
    name: model.name,
    description: model.description,
    dietaryRestrictions: [...(model.dietaryRestrictions ?? [])],
    origin: model.country,
    mealType: model.mealType,
    ingredients,
    instructions: [...(model.instructions ?? [])],
    cookTime: model.cookTime,
    image: image ?? null,
    imageUrl: model.imageUrl ?? null,
    servings: model.servings,
  } as RecipeDTO;
}