import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SiteListComponent } from './site-list/site-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SiteListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'pass-man';
}
