import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RecipeEditingDialogComponent, RecipeEditingDialogData } from '../../../feature/home/components/recipeEditing/recipeEditingDialog.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule, ReactiveFormsModule,
    MatDialogModule, MatButtonModule, MatIconModule,],
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {

  constructor(
    private ref: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) { }


  onConfirm() {
    this.ref.close(true);
  }

  onCancel() {
    this.ref.close(false);
  }
}
