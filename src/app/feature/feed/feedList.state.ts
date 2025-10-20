import { Feed } from "./model/feed.model";

export class FeedListState {
    isLoading: boolean = false;
    feeds: Feed[] = [];
    error: string | null = null;
    openRecipeEditingDialog: boolean = false;
    selectedFeed: Feed | null = null;
}