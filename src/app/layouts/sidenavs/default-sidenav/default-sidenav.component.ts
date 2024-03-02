import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {SidenavLinkComponent} from "../../../shared/global-modules/sidebar/sidenav-link/sidenav-link.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIcon, SidenavLinkComponent],
  template: ` <h1>Sidenav</h1>

  @for (link of links; track link.path) {
    <app-sidenav-link [routerLink]="link.path">
      <mat-icon icon>{{ link.icon }}</mat-icon>

      {{ link.name }}
    </app-sidenav-link>
  }`,
  styles: [``],
})
export class DefaultSidenavComponent {
  links = [
    {path: '/home', icon: 'home', name: 'Home'},
    {path: '/profile', icon: 'account_circle', name: 'Profile'},
    {path: 'screen-1', icon: 'screen_share', name: 'Screen 1'},
    {path: 'screen-2', icon: 'screen_share', name: 'Screen 2'},
    {path: '/settings', icon: 'settings', name: 'Settings'},
  ];
}
