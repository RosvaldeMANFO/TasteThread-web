import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Feed } from "../../model/feed.model";
import { MatCardModule } from "@angular/material/card";


@Component({
    selector: 'app-feed-card',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    templateUrl: './feedCard.component.html'
})
export class FeedCard {
    @Input() feed!: Feed;
    @Output() cardClick = new EventEmitter<Feed>();

    onCardClick() {
        this.cardClick.emit(this.feed);
    }
}