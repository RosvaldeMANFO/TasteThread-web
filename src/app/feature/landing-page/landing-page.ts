import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
})
export class LandingPage {
  appName: string = environment.app.name;
}