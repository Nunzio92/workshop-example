import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './example-component/example.component';


const routes: Routes = [
  {path: '', redirectTo: 'feature1-component-1', pathMatch: 'full'},
  {path: 'feature1-component-1', component: ExampleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Feature1RoutingModule {
}
