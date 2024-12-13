import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodingComponent } from './index/coding.component';
import { CodingRoutingModule } from './coding-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CodingRoutingModule
  ],
  declarations: [CodingComponent]
})
export class CodingModule { }
