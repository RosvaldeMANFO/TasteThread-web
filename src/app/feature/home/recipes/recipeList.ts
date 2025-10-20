import { AfterViewInit, Component, ViewChild, EventEmitter, Input, Output, ɵɵqueryRefresh } from '@angular/core';
import { RecipeListState } from './recipeList.state';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RecipeModel } from '../../../core/model/recipe/recipe.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatProgressSpinnerModule,
     MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './recipeList.html',
})
export class RecipeList implements AfterViewInit {
  private _state?: RecipeListState;

  @Input()
  set state(value: RecipeListState | undefined) {
    this._state = value;
    if (value?.recipes) {
      this.dataSource.data = value.recipes;
      this.resultsLength = value.recipes.length;
    }
  }
  get state(): RecipeListState | undefined {
    return this._state;
  }

  @Output() loadMore: EventEmitter<void> = new EventEmitter<void>();
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() loadMoreSearches: EventEmitter<void> = new EventEmitter<void>();
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>(); 

  displayedColumns: string[] = ['name', 'mealType', 'origin', 'author', 'actions'];
  dataSource = new MatTableDataSource<RecipeModel>([]);
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        tap(() => {
          if (this.state?.searchTerm) {
            this.loadMoreSearches.emit();
          } else {
            this.loadMore.emit();
          }
        })
      )
      .subscribe();
  }

  revealRecipe(recipe: RecipeModel) {
    console.log('Revealing recipe:', recipe);
  }

  deleteRecipe(recipe: RecipeModel) {
    console.log('Deleting recipe:', recipe);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue.length > 0) {
      this.search.emit(filterValue);
    } else {
      this.refresh.emit();
    }
  }

  refreshList(input: HTMLInputElement) {
    if(input.value.length > 0) {
      input.value = '';
      this.refresh.emit();
    }
  }
}