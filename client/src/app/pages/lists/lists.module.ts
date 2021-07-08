import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListFormModule } from "src/app/list-form/list-form.module";
import { ListViewModule } from "src/app/list-view";
import { SharedModule } from "src/app/shared";
import { ListsComponent } from "./lists.component";

const routes: Routes = [
  { path: '', component: ListsComponent }, // remember to add component to declarations!
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    ListFormModule,
    ListViewModule
  ],
  declarations: [
    ListsComponent
  ],
  exports: [RouterModule],
})
export class ListsModule { }
