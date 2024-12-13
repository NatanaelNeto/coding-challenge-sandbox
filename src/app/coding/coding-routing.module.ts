import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CodingComponent } from "./index/coding.component";

const routes: Routes = [
  { path: '', component: CodingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CodingRoutingModule { }