import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { FeedListState } from './feedList.state';
import { MatIcon } from "@angular/material/icon";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipeEditingDialogComponent } from './components/recipeEditing/recipeEditingDialog.component';
import { RecipeDTO } from '../../core/model/recipe/recipe.dto';
import { finalize } from 'rxjs';
import { FeedCard, } from "./components/feedCard/feedCard.component";
import { Feed } from './model/feed.model';
import { FeedDetailsComponent } from "./components/feedDetails/feedDetails.component";

@Component({
  selector: 'app-feed-list',
  imports: [MatIcon, FeedCard, FeedDetailsComponent],
  templateUrl: './feedList.html',
})
export class FeedList implements OnInit {

  state = new FeedListState();
  constructor(private feedService: FeedService, private dialog: MatDialog) { }



  ngOnInit() {
    this.loadFeed();
  }

  loadFeed() {
    this.state.isLoading = true;
    this.feedService.getFeed()
      .pipe(finalize(() => { this.state.isLoading = false; }))
      .subscribe({
        next: data => { this.state.feeds = data; },
        error: error => { this.state.error = error; }
      });
  }

  createRecipe() {
    const ref = this.openRecipeEditingDialog(
      {
        title: 'Create recipe',
        message: 'Recipe editor coming soon.',
        confirmText: 'Got it'
      },
    );

    ref.afterClosed().subscribe(payload => {
      this.handleRecipeCreated(payload)
    });
  }

  private openRecipeEditingDialog(data: any): MatDialogRef<RecipeEditingDialogComponent> {
    return this.dialog.open(RecipeEditingDialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      disableClose: true,
      data: data,
      autoFocus: false
    });
  }

  private handleRecipeCreated(recipe?: RecipeDTO) {
    if (recipe) {
      console.log('Dialog closed with recipe data:', recipe);
      this.feedService.createRecipe(recipe)
        .subscribe({
          next: data => {
            this.loadFeed();
            console.log('Recipe created successfully:', data);
          },
          error: (err) => { console.error('Error creating recipe:', err); }
        });
    }
  }

  onFeedCardClick(feed: Feed) {
      this.state.selectedFeed = feed;
  }

  closeFeedDetail() {
      this.state.selectedFeed = null;
  }
}
