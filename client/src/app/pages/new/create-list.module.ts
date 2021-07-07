import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InputCheckboxComponent, InputDropdownComponent, InputComponent } from "src/app/shared";
import { AutofocusDirective } from "src/app/directives";
import { ListItemsComponent } from "./list-items";
import { RecurringComponent } from "./recurring";
import { CreateListComponent } from "./create-list.component";

const routes: Routes = [
  { path: '', component: CreateListComponent }, // remember to add component to declarations!
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [
    InputComponent,
    InputCheckboxComponent,
    InputDropdownComponent,
    RecurringComponent,
    ListItemsComponent,
    CreateListComponent,
    AutofocusDirective
  ],
  exports: [RouterModule],
})
export class CreateListModule { }
