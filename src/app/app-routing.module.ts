import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'coding',
    loadChildren: () => import('./coding/coding.module').then(m => m.CodingModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect
  { path: '**', redirectTo: '' } // Error 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
