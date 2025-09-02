import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (!sessionStorage.getItem('token')) {
        this.router.navigate(['/auth'], { replaceUrl: true });
      }
    }
  }
}
