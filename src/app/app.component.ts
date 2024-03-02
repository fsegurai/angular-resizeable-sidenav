import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {SidenavService} from "./shared/global-modules/sidebar/sidenav.service";
import {SidenavComponent} from "./shared/global-modules/sidebar/sidenav/sidenav.component";
import {DefaultSidenavComponent} from "./layouts/sidenavs/default-sidenav/default-sidenav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  constructor(
    private sidenavService: SidenavService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    this.sidenavService.push(DefaultSidenavComponent);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.sidenavService.pop();
  }
}
