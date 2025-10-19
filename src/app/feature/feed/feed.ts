import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { FeedState } from './feed.state';

@Component({
  selector: 'app-feed',
  imports: [],
  templateUrl: './feed.html',
})
export class Feed implements OnInit {

  state = new FeedState();
  constructor(private feedService: FeedService) { }



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

}
