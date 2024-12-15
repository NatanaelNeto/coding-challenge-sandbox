import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodingComponent } from './index/coding.component';
import { CodingRoutingModule } from './coding-routing.module';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';
import { FormsModule } from '@angular/forms';
import { SnakeComponent } from './snake/snake.component';
import { AStarComponent } from './a-star/a-star.component';

@NgModule({
  imports: [
    CommonModule,
    CodingRoutingModule,
    FormsModule
  ],
  declarations: [
    CodingComponent,
    GameOfLifeComponent,
    SnakeComponent,
    AStarComponent
  ],
})
export class CodingModule { }
