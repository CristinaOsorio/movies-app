import { NoInformationPipe } from './no-information/no-information.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NoInformationPipe],
  imports: [
    CommonModule
  ],
  exports: [NoInformationPipe]
})
export class PipesModule { }
