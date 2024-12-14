import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodingComponent } from './index/coding.component';
import { CodingRoutingModule } from './coding-routing.module';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';

@NgModule({
  imports: [
    CommonModule,
    CodingRoutingModule
  ],
  declarations: [
    CodingComponent,
    GameOfLifeComponent
  ],
})
export class CodingModule { }
