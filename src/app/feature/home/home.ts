import { Component, OnInit } from '@angular/core';
import { HomeState } from './home.state';
import { HomeService } from './home.service';
import { Header } from './components/header/header.component';
import { RecipeList } from './components/recipes/recipeList';
import { RecipeListState } from './components/recipes/recipeList.state';
import { delay } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipeDTO } from '../../core/model/recipe/recipe.dto';
import { RecipeEditingDialogComponent } from './components/recipeEditing/recipeEditingDialog.component';
import { MatIcon } from '@angular/material/icon';
import { FeedDetails } from "./components/feedDetails/feedDetails.component";
import { RecipeModel } from '../../core/model/recipe/recipe.model';
import { recipeModelToFeed } from './model/recipe.mapper';

@Component({
  selector: 'app-home',
  imports: [Header, RecipeList, MatIcon, FeedDetails],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  state: HomeState = new HomeState();

  constructor(private service: HomeService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadStatsData();
    this.loadRecipes();
  }

  private loadStatsData() {
    this.state.isLoading = true;
    this.service.getStats().subscribe({
      next: (response) => {
        if (response.data) {
          this.state.stats = response.data;
        }
        this.state.isLoading = false;
      },
      error: (result) => {
        this.state.error = result.error.message;
        this.state.isLoading = false;
      }
    });
  }

  private loadRecipes(offset: number = 0) {
    this.state.recipeListState.isLoading = true;
    this.service.getRecipes(offset).subscribe({
      next: (response) => {
        this.state.recipeListState = {
          ...this.state.recipeListState,
          recipes: response.data || [],
          isLoading: false
        };
      },
      error: (result) => {
        this.state.recipeListState.error = result.error.message;
        this.state.recipeListState.isLoading = false;
      }
    });
  }

  loadMoreRecipes() {
    let offset = this.state.recipeListState.recipes.length || 0;
    this.loadRecipes(offset);
  }

  searchRecipes(filter: string) {
    this.state.recipeListState.isLoading = true;
    this.state.recipeListState.searchTerm = filter;
    this.service.searchRecipes(filter, 0).subscribe({
      next: (response) => {
        console.log(response);
        this.state.recipeListState = {
          ...this.state.recipeListState,
          recipes: response.data || [],
          isLoading: false
        };
      },
      error: (result) => {
        this.state.recipeListState.error = result.error.message;
        this.state.recipeListState.isLoading = false;
      }
    });
  }

  loadMoreSearchResults() {
    this.state.recipeListState.isLoading = true;
    this.service.searchRecipes(
      this.state.recipeListState.searchTerm,
      this.state.recipeListState.recipes.length
    ).subscribe({
      next: (response) => {
        this.state.recipeListState = {
          ...this.state.recipeListState,
          recipes: response.data || [],
          isLoading: false
        };
      },
      error: (result) => {
        this.state.recipeListState.error = result.error.message;
        this.state.recipeListState.isLoading = false;
      }
    });
  }

  refreshRecipes() {
    this.state = {
      ...this.state,
      recipeListState: new RecipeListState()
    };
    this.loadRecipes();
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

  revealRecipe(recipe: RecipeModel) {
    this.state = {
      ...this.state,
      recipeListState: {
        ...this.state.recipeListState,
        selectedFeed: recipeModelToFeed(recipe)
      }
    }
  }

  closeFeedDetail() {
    this.state = {
      ...this.state,
      recipeListState: {
        ...this.state.recipeListState,
        selectedFeed: null
      }
    }
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
      this.service.createRecipe(recipe)
        .subscribe({
          next: data => {
            this.refreshRecipes();
            console.log('Recipe created successfully:', data);
          },
          error: (err) => { console.error('Error creating recipe:', err); }
        });
    }
  }

  approveRecipe() {
    if (this.state.recipeListState.selectedFeed) {
      let updateRecipeId = this.state.recipeListState.selectedFeed?.recipe.id;
      this.service.approveRecipe(updateRecipeId)
        .subscribe({
          next: () => {
            this.refreshRecipes();
            let selectedFeed = recipeModelToFeed(
              this.state.recipeListState.recipes.find(r => r.id === updateRecipeId)!
            );
            this.state = {
              ...this.state,
              recipeListState: {
                ...this.state.recipeListState,
                selectedFeed
              }
            };
          },
          error: (err) => {
            console.error('Error approving recipe:', err);
          }
        }
      );
    }
  }
}
