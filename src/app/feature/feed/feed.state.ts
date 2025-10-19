import { Feed } from "./model/feed.model";

export class FeedState {
    isLoading: boolean = false;
    feeds: Feed[] = [];
    error: string | null = null;
    openRecipeEditingDialog: boolean = false;
}