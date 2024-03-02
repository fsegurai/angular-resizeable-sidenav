import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {SidenavLinkComponent} from "../../../shared/global-modules/sidebar/sidenav-link/sidenav-link.component";

@Component({
  selector: 'app-settings-sidenav',
  standalone: true,
  imports: [MatIcon, SidenavLinkComponent, RouterLink, RouterLinkActive],
  template: `
    <h1>Sidenav</h1>

    @for (link of links; track link.path) {
      <app-sidenav-link [routerLink]="link.path"
                        [routerLinkActiveOptions]="{ exact: true }">
        <mat-icon icon>{{ link.icon }}</mat-icon>

        {{ link.name }}
      </app-sidenav-link>
    }
  `,
})
export class SettingsSidenavComponent {
  links = [
    {path: '/', icon: 'arrow_back', name: 'Back'},
    {path: '/settings/account', icon: 'person', name: 'Account'},
    {path: '/settings/security', icon: 'security', name: 'Security'},
    {path: '/settings/notifications', icon: 'notifications', name: 'Notifications'},
  ];
}
