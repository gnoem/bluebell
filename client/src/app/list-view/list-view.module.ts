import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared";
import { ListItemComponent } from "./list-item";
import { ListViewComponent } from "./list-view.component";

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [
    ListViewComponent,
    ListItemComponent
  ],
  exports: [
    RouterModule,
    ListViewComponent
  ],
})
export class ListViewModule { }