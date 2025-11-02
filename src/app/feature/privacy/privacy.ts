import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MatToolbar } from "@angular/material/toolbar";
import { PrivacyState } from './privacy.state';

@Component({
  selector: 'app-privacy',
  imports: [MatToolbar],
  templateUrl: './privacy.html',
})
export class Privacy {

  state: PrivacyState = {
    appName: environment.app.name,
    lastUpdate: environment.legal.privacyPolicyLastUpdate,
    contactEmail: environment.contact.email,
    copyrightYear: environment.legal.copyrightYear,
    companyName: environment.legal.companyName,
  };

}
