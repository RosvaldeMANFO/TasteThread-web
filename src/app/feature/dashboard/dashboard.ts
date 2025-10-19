import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar'
import { DashboardState } from './dashboard.state';
import { Feed } from "../feed/feed";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatSidenavModule, MatIconModule, MatListModule, MatToolbarModule, Feed],
  templateUrl: './dashboard.html',
  styleUrls: ['./style.css'],
})
export class Dashboard implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
  }

  state: DashboardState = {
    isSidenavOpen: true,
    appName: 'Cook',
    menuItems: [
      { name: 'Feed', route: '/feed', icon: 'feed' },
      { name: 'Pending feed', route: '/pending-feed', icon: 'hourglass_top' },
      { name: 'Users', route: '/users', icon: 'people' },
      { name: "Log out", route: "/logout", icon: "logout" }
    ],
    activeRoute: '/feed',
  };

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (!sessionStorage.getItem('token')) {
        this.router.navigate(['/auth'], { replaceUrl: true });
      }
    }
  }

  updateActiveRoute(route: string) {
    this.state.activeRoute = route;
  }
}
