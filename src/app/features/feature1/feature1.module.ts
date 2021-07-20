import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example-component/example.component';
import { Feature1RoutingModule } from './feature1-routing.module';
import { BypassSecurityPipe } from './safe-url.pipe';
import { Feature1StoreModule } from './store/feature1-store.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';


@NgModule({
  declarations: [ExampleComponent, BypassSecurityPipe],
  imports: [
    CommonModule,
    Feature1RoutingModule,
    NgSelectModule,
    Feature1StoreModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  providers: []
})
export class Feature1Module {
}
