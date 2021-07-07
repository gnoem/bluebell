import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InputCheckboxComponent, InputComponent } from "src/app/shared";
import { ListItemsComponent } from "./list-items";
import { CreateListComponent } from "./createlist.component";
import { RecurringComponent } from "./recurring";
import { InputDropdownComponent } from "src/app/shared/inputs/input-dropdown.component";

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
    CreateListComponent
  ],
  exports: [RouterModule],
})
export class CreateListModule { }
