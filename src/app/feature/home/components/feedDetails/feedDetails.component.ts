import { Component, Input } from "@angular/core";
import { Feed } from "../../model/feed.model";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from "@angular/material/icon";


@Component({
    selector: 'app-feed-details',
    templateUrl: './feedDetails.component.html',
    imports: [CommonModule, MatTabsModule, MatIconModule]
})
export class FeedDetails {
    @Input() feed?: Feed;
}