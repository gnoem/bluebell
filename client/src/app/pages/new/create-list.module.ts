import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared";
import { CreateListComponent } from "./create-list.component";
import { ListFormModule } from "src/app/list-form/list-form.module";

const routes: Routes = [
  { path: '', component: CreateListComponent }, // remember to add component to declarations!
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    ListFormModule
  ],
  declarations: [
    CreateListComponent
  ],
  exports: [RouterModule],
})
export class CreateListModule { }
