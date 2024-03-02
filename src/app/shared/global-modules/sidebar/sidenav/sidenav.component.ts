import {Component, HostBinding, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {SidenavService} from '../sidenav.service';
import {SidenavContentAreaDirective} from "../sidenav-content-area.directive";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatIcon, SidenavContentAreaDirective],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  // the current resizing event
  resizingEvent = {
    // whether the user is currently resizing the sidenav
    isResizing: false,

    // the x coordinate of the mouse when the user started resizing
    startingCursorX: 0,

    // the width of the sidenav when the user started resizing
    startingWidth: 0,
  };

  constructor(public sidenavService: SidenavService) {
  }

  @ViewChild(SidenavContentAreaDirective, {static: true})
  sidenavContentArea?: SidenavContentAreaDirective;

  ngOnInit(): void {
    if (!this.sidenavContentArea) {
      throw new Error('sidenavContentArea is undefined');
    }

    this.sidenavService.setDynamicContentArea(this.sidenavContentArea);
  }

  /**
   * Whether the sidenav is currently being resized
   */
  @HostBinding('class.resizing')
  get isResizing(): boolean {
    return this.resizingEvent.isResizing;
  }

  /**
   * Whether the sidenav is expanded
   */
  @HostBinding('class.is-expanded')
  get isExpanded() {
    return this.sidenavService.isExpanded;
  }

  /**
   * Starts the resizing of the sidenav
   * @param event
   */
  startResizing(event: MouseEvent): void {
    this.resizingEvent = {
      isResizing: true,
      startingCursorX: event.clientX,
      startingWidth: this.sidenavService.sidenavWidth,
    };
  }

  /**
   * Updates the sidenav width based on the mouse position
   * @param event
   */
  @HostListener('window:mousemove', ['$event'])
  updateSidenavWidth(event: MouseEvent) {
    if (!this.resizingEvent.isResizing) {
      return;
    }

    const cursorDeltaX = event.clientX - this.resizingEvent.startingCursorX;

    const newWidth = this.resizingEvent.startingWidth + cursorDeltaX;

    this.sidenavService.setSidenavWidth(newWidth);
  }

  /**
   * Stops the resizing of the sidenav
   */
  @HostListener('window:mouseup')
  stopResizing() {
    this.resizingEvent.isResizing = false;
  }
}
