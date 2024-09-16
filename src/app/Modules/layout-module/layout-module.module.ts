import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../SharedModule/shared/shared.module';
import { LayoutModuleRoutingModule } from './layout-module-routing.module';
import { LayoutComponentComponent } from './layout-component/layout-component.component';

@NgModule({
  declarations: [
    LayoutComponentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LayoutModuleRoutingModule
  ],
  exports: [
    LayoutComponentComponent
  ]
})
export class LayoutModuleModule { }
