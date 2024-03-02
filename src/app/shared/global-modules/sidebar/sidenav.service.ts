import {Injectable} from '@angular/core';
import type {Type as Component} from '@angular/core';
import {SidenavContentAreaDirective} from "./sidenav-content-area.directive";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  readonly sidenavMinWidth = 250;
  readonly sidenavMaxWidth = window.innerWidth - 250;

  isExpanded = true;
  #contentArea?: SidenavContentAreaDirective;
  #stack = [] as Component<unknown>[];
  isSlidingInFromRight = false;
  isSlidingInFromLeft = false;

  constructor() {
  }

  /**
   * Returns the duration of the sidenav transition in milliseconds.
   */
  get sidenavTransitionDuration(): number {
    const sidenavTransitionDurationFromCssVariable = getComputedStyle(document.body).getPropertyValue('--sidenav-transition-duration');

    return parseInt(sidenavTransitionDurationFromCssVariable, 10);
  }

  /**
   * Returns the width of the sidenav as pixels.
   */
  get sidenavWidth(): number {
    return parseInt(getComputedStyle(document.body).getPropertyValue('--sidenav-width'), 10
    );
  }

  /**
   * Sets the width of the sidenav to given number (clamped between a min and a max) as pixels.
   */
  setSidenavWidth(width: number) {
    const clampedWidth = Math.min(
      Math.max(width, this.sidenavMinWidth),
      this.sidenavMaxWidth
    );

    document.body.style.setProperty('--sidenav-width', `${clampedWidth}px`);
  }

  /**
   * Toggles the sidenav.
   */
  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  /**
   * Expands the sidenav.
   */
  expandSidenav() {
    this.isExpanded = true;
  }

  /**
   * Collapses the sidenav.
   */
  collapseSidenav() {
    this.isExpanded = false;
  }

  /**
   * Sets the dynamic content area of the sidenav.
   * @param host - The dynamic content area directive.
   */
  setDynamicContentArea(host: SidenavContentAreaDirective) {
    this.#contentArea = host;
  }

  /**
   * Pushes a new item to the stack.
   * @param component - The component to push to the stack.
   */
  async push(component: Component<unknown>): Promise<void> {
    this.#stack.push(component);

    this.#setContent(component);

    await this.#animateInFromTheRight();
  }

  /**
   * Pops the last item from the stack.
   */
  async pop(): Promise<void> {
    // At least one item must be in the stack so user isn't left with an empty sidenav
    if (this.#stack.length === 1) {
      return;
    }

    this.#stack.pop();

    this.#setContent(this.#lastStackItem);

    await this.#animateInFromTheLeft();
  }

  /**
   * Returns the last item in the stack.
   * @private - This method is private and should not be used outside of this class.
   */
  get #lastStackItem(): Component<unknown> {
    return this.#stack[this.#stack.length - 1];
  }

  /**
   * Sets the content of the sidenav to the given component.
   * @param component - The component to set the content to.
   * @private - This method is private and should not be used outside of this class.
   */
  #setContent(component: Component<unknown>): void {
    this.#contentArea?.viewContainerRef.clear();

    this.#contentArea?.viewContainerRef.createComponent(component);
  }

  /**
   * Animates the sidenav in from the left.
   * @private - This method is private and should not be used outside of this class.
   */
  async #animateInFromTheLeft() {
    this.isSlidingInFromLeft = true;

    await this.#sleep(this.sidenavTransitionDuration);

    this.isSlidingInFromLeft = false;
  }

  /**
   * Animates the sidenav in from the right.
   * @private - This method is private and should not be used outside of this class.
   */
  async #animateInFromTheRight() {
    this.isSlidingInFromRight = true;

    await this.#sleep(this.sidenavTransitionDuration);

    this.isSlidingInFromRight = false;
  }

  /**
   * Sleeps for a given amount of milliseconds.
   * @param ms - The amount of milliseconds to sleep for.
   * @private - This method is private and should not be used outside of this class.
   */
  #sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
