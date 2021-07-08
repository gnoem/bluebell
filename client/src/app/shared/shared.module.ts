import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AutofocusDirective } from "src/app/directives";
import { InputCheckboxComponent, InputComponent, InputDropdownComponent, FancyButtonComponent } from "./inputs";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    InputComponent,
    InputCheckboxComponent,
    InputDropdownComponent,
    FancyButtonComponent,
    AutofocusDirective
  ],
  exports: [
    InputComponent,
    InputCheckboxComponent,
    InputDropdownComponent,
    FancyButtonComponent,
    AutofocusDirective
  ]
})
export class SharedModule { }