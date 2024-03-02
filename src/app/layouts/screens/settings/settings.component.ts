import {Component, AfterViewInit, OnDestroy} from '@angular/core';
import {SidenavService} from "../../../shared/global-modules/sidebar/sidenav.service";
import {SettingsSidenavComponent} from '../../sidenavs/settings-sidenav/settings-sidenav.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SettingsSidenavComponent],
  template: `<h1>Settings</h1>`,
})
export class SettingsComponent implements AfterViewInit, OnDestroy {
  constructor(public sidenavService: SidenavService) {
  }

  ngAfterViewInit(): void {
    this.sidenavService.push(SettingsSidenavComponent);
  }

  ngOnDestroy(): void {
    this.sidenavService.pop();
  }
}
