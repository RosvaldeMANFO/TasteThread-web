import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HomeState } from './home.state';
import { HomeService } from './home.service';
import { Header } from './components/header/header.component';
import { RecipeList } from './components/recipes/recipeList';
import { RecipeListState } from './components/recipes/recipeList.state';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RecipeDTO } from '../../core/model/recipe/recipe.dto';
import { RecipeEditingDialogComponent, RecipeEditingDialogData } from './components/recipeEditing/recipeEditingDialog.component';
import { MatIcon } from '@angular/material/icon';
import { FeedDetails } from "./components/feedDetails/feedDetails.component";
import { RecipeModel } from '../../core/model/recipe/recipe.model';
import { recipeModelToDTO, recipeModelToFeed } from './model/recipe.mapper';
import { ConfirmDialog } from '../../utils/components/confirm-dialog/confirm-dialog';
import { CustomButtonComponent } from "../../utils/components/custom-button/custom-button";
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-home',
  imports: [Header, RecipeList, MatIcon, FeedDetails, CustomButtonComponent,
    MatToolbarModule],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  state: HomeState = new HomeState();

  constructor(
    private service: HomeService,
    private dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.checkPlatformAndAuthentication();
    this.loadStatsData();
    this.loadRecipes();
  }

  logout() {
    this.auth.logout();
  }

  private checkPlatformAndAuthentication() {
    if (!isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/landing'], { replaceUrl: true });
    } else {
      if (!this.auth.getToken()) {
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    }
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

  private loadRecipes(offset: number = 0, reselectId?: string | null) {
    this.state.recipeListState.isLoading = true;
    this.service.getRecipes(
      offset, this.state.recipeListState.showUnapprovedOnly
    ).subscribe({
      next: (response) => {
        const recipes = response.data || [];

        let selectedFeed = this.state.recipeListState.selectedFeed;
        if (reselectId) {
          const found = recipes.find(r => r.id === reselectId);
          if (found) {
            const userEmail = this.auth.getCredential()?.email || null;
            selectedFeed = recipeModelToFeed(found, userEmail);
          } else {
            selectedFeed = null;
          }
        }

        this.state.recipeListState = {
          ...this.state.recipeListState,
          recipes,
          selectedFeed,
          isLoading: false
        };
      },
      error: (error) => {
        this.state.recipeListState.error = error.message;
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
    this.service.searchRecipes(
      filter, 0, this.state.recipeListState.showUnapprovedOnly
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

  loadMoreSearchResults() {
    this.state.recipeListState.isLoading = true;
    this.service.searchRecipes(
      this.state.recipeListState.searchTerm,
      this.state.recipeListState.recipes.length,
      this.state.recipeListState.showUnapprovedOnly
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

  refreshRecipes(pendingOnly: boolean = false) {
    const selectedFeedId = this.state.recipeListState.selectedFeed?.recipe.id || null;

    this.state = {
      ...this.state,
      recipeListState: new RecipeListState({
        showUnapprovedOnly: pendingOnly
      })
    };

    this.loadRecipes(0, selectedFeedId);
  }

  createRecipe() {
    const ref = this.openRecipeEditingDialog(
      {
        title: 'Create recipe',
      },
    );

    ref.afterClosed().subscribe(payload => {
      this.handleRecipeCreated(payload)
    });
  }

  editRecipe(recipe: RecipeModel) {
    const ref = this.openRecipeEditingDialog(
      {
        recipe: recipeModelToDTO(recipe),
        title: 'Edit recipe',
      },
    );
    ref.afterClosed().subscribe(payload => {
      this.handleRecipeUpdated(payload)
    });
  }

  revealRecipe(recipe: RecipeModel) {
    let userEmail = this.auth.getCredential()?.email || null;
    this.state = {
      ...this.state,
      recipeListState: {
        ...this.state.recipeListState,
        selectedFeed: recipeModelToFeed(recipe, userEmail)
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

  private openRecipeEditingDialog(data: RecipeEditingDialogData): MatDialogRef<RecipeEditingDialogComponent> {
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
      this.service.createRecipe(recipe)
        .subscribe({
          next: _ => {
            this.refreshRecipes();
          },
          error: (err) => { console.error('Error creating recipe:', err); }
        });
    }
  }

  private handleRecipeUpdated(recipe?: RecipeDTO) {
    if (recipe) {
      this.service.updateRecipe(recipe)
        .subscribe({
          next: _ => {
            this.refreshRecipes();
          },
          error: (err) => { console.error('Error updating recipe:', err); }
        });
    }
  }

  approveRecipe() {
    if (this.state.recipeListState.selectedFeed) {
      this.service.approveRecipe(this.state.recipeListState.selectedFeed.recipe.id)
        .subscribe({
          next: () => {
            this.refreshRecipes();
          },
          error: (err) => {
            console.error('Error approving recipe:', err);
          }
        }
        );
    }
  }

  deleteRecipe(recipeId: string) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete Recipe',
        message: 'Are you sure you want to delete this recipe? This action cannot be undone.',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.confirmDeleteRecipe(recipeId);
      }
    });
  }

  private confirmDeleteRecipe(recipeId: string) {
    this.service.deleteRecipe(recipeId).subscribe({
      next: () => {
        this.refreshRecipes();
        if (recipeId === this.state.recipeListState.selectedFeed?.recipe.id) {
          this.closeFeedDetail();
        }
      },
      error: (err) => {
        console.error('Error deleting recipe:', err);
      }
    });
  }

  togglePendingFilter(showUnapprovedOnly: boolean) {
    this.refreshRecipes(showUnapprovedOnly);
  }
}
