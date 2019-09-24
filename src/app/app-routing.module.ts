import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
     path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {path: 'login', loadChildren: ()=> import('./login/login.module').then(m=> m.LoginPageModule)},
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule' },
  { path: 'profile-update', loadChildren: './profile-update/profile-update.module#ProfileUpdatePageModule' }
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
