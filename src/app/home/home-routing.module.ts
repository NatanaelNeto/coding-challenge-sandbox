import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./index/home.component";
import { DevlogListComponent } from "./devlog/devlog-list/devlog-list.component";
import { DevlogDetailComponent } from "./devlog/devlog-detail/devlog-detail.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'devlog', component: DevlogListComponent },
  { path: 'devlog/:id', component: DevlogDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }