import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './app/pages/home/home.component';

/* Routing Options */
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 100],
  initialNavigation: 'enabled'
  // preloadingStrategy: PreloadAllModules
};

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
];
  
@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes, routerOptions)
    // RouterModule.forRoot(appRoutes, {
    //     initialNavigation: 'enabled'
    // })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { 

}