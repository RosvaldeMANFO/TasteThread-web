import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { FeedState } from './feed.state';
import { MatIcon } from "@angular/material/icon";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipeEditingDialogComponent } from './components/recipeEditing/recipeEditingDialog.component';
import { RecipeDTO } from '../../core/model/recipe/recipe.dto';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-feed',
  imports: [MatIcon],
  templateUrl: './feed.html',
})
export class Feed implements OnInit {

  state = new FeedState();
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
}
