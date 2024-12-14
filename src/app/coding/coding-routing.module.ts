import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CodingComponent } from "./index/coding.component";
import { GameOfLifeComponent } from "./game-of-life/game-of-life.component";

const routes: Routes = [
  { path: '', component: CodingComponent },
  { path: 'game-of-life', component: GameOfLifeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CodingRoutingModule { }