import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AutofocusDirective } from "src/app/directives";
import { InputCheckboxComponent, InputComponent, InputDropdownComponent } from "./inputs";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InputComponent,
    InputCheckboxComponent,
    InputDropdownComponent,
    AutofocusDirective
  ],
  exports: [
    InputComponent,
    InputCheckboxComponent,
    InputDropdownComponent,
    AutofocusDirective
  ]
})
export class SharedModule { }