import {Routes} from '@angular/router';

import {HomeComponent} from "./layouts/screens/home/home.component";
import {ProfileComponent} from "./layouts/screens/profile/profile.component";
import {Screen1Component} from "./layouts/screens/screen-1/screen-1.component";
import {Screen2Component} from "./layouts/screens/screen-2/screen-2.component";
import {SettingsComponent} from "./layouts/screens/settings/settings.component";

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'screen-1',
    component: Screen1Component,
  },
  {
    path: 'screen-2',
    component: Screen2Component,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  // redirect to `home` if there is no path
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
