import { Component, Input } from '@angular/core';
import { StatsModel } from '../../../../core/model/admin/stats.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Spinner } from "../../../../utils/components/spinner/spinner";


@Component({
  selector: 'app-header',
  imports: [CommonModule, MatProgressSpinnerModule, Spinner],
  templateUrl: './header.component.html',
})
export class Header {
  @Input() stats?: StatsModel;
  @Input() isLoading?: boolean;
}
