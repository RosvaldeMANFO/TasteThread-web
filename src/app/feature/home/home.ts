import { Component, OnInit } from '@angular/core';
import { HomeState } from './home.state';
import { HomeService } from './home.service';
import { Header } from './header/header';
import { RecipeList } from './recipes/recipeList';
import { RecipeListState } from './recipes/recipeList.state';
import { delay } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Header, RecipeList],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  state: HomeState = new HomeState();

  constructor(private service: HomeService) { }

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
}
