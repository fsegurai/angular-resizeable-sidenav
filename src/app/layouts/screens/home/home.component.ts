import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Home Screen</h1>

    <router-outlet></router-outlet>
  `,
})
export class HomeComponent {
}
