import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'features', pathMatch: 'full'},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'features', loadChildren: () => import('./features/feature1/feature1.module').then(mod => mod.Feature1Module)},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
