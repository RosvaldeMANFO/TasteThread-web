import { Component, Input } from '@angular/core';
import { StatsModel } from '../../../core/model/admin/stats.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './header.html',
})
export class Header {
  @Input() stats?: StatsModel;
  @Input() isLoading?: boolean;
}
