import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { FeedListState } from './feedList.state';
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';
import { RecipeEditingDialogComponent } from './components/recipeEditing/recipeEditingDialog.component';
import { RecipeDTO } from '../../core/model/recipe/recipe.dto';
import { finalize } from 'rxjs';
import { FeedCard, } from "./components/feedCard/feedCard.component";
import { Feed } from './model/feed.model';

@Component({
  selector: 'app-feed-list',
  imports: [MatIcon, FeedCard],
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

  openRecipeEditingDialog() {
    const ref = this.dialog.open(RecipeEditingDialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      disableClose: true,
      data: {
        title: 'Create recipe',
        message: 'Recipe editor coming soon.',
        confirmText: 'Got it'
      },
      autoFocus: false
    });

    ref.afterClosed().subscribe(payload => {
      this.handleRecipeCreated(payload)
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
    console.log('Feed card clicked:', feed.canEdit);
    // You can implement further actions here, such as navigating to a detailed view.
  }
}
