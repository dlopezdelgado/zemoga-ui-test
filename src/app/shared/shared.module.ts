import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/ui/error/error.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/ui/loader/loader.component';



@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    ErrorComponent, 
    LoaderComponent
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
