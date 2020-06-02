import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'',
    redirectTo: 'home',
    pathMatch:'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'geolocation',
    loadChildren: () => import('./PAGES/geolocation/geolocation.module').then( m => m.GeolocationPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./PAGES/home/home.module').then( m => m.HomePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
