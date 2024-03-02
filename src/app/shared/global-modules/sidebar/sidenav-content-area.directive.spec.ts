import {ViewContainerRef} from "@angular/core"
  ;
import {SidenavContentAreaDirective} from './sidenav-content-area.directive';

describe('SidenavContentAreaDirective', () => {
  it('should create an instance', () => {
    const viewContainerRef = {} as ViewContainerRef;
    const directive = new SidenavContentAreaDirective(viewContainerRef);
    expect(directive).toBeTruthy();
  });
});
