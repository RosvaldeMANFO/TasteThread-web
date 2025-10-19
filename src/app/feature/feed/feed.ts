import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { FeedState } from './feed.state';
import { MatIcon } from "@angular/material/icon";
import { MatDialog } from '@angular/material/dialog';
import { RecipeEditingDialogComponent } from './components/recipeEditing/recipeEditingDialog.component';

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
    this.feedService.getFeed().subscribe(
      data => {
        this.state.feeds = data;
        this.state.isLoading = false;
      },
      error => {
        this.state.error = error;
        this.state.isLoading = false;
      }
    );
  }

  openRecipeEditingDialog() {
    const ref = this.dialog.open(RecipeEditingDialogComponent, {
      width: '900px',  // Increase from current width
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

    ref.afterClosed().subscribe(result => {
      if (result) {
        console.log('Recipe payload', result);
      }
    });
  }

}
