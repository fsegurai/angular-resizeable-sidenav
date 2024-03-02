import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[sidenavContentArea]',
  standalone: true
})
export class SidenavContentAreaDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) {
  }
}
