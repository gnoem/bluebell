import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared";
import { ListItemsComponent } from "./list-items";
import { RecurringComponent } from "./recurring";
import { ListFormComponent } from "./list-form.component";

@NgModule({
  imports: [
    SharedModule,
    CommonModule
  ],
  declarations: [
    RecurringComponent,
    ListItemsComponent,
    ListFormComponent
  ],
  exports: [
    RouterModule,
    ListFormComponent
  ],
})
export class ListFormModule { }
