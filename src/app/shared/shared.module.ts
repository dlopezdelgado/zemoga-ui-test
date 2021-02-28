import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/ui/error/error.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from './components/ui/loader/loader.component';


@NgModule({
  declarations: [
    ErrorComponent, 
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  exports: [
    LoaderComponent,
    ErrorComponent
  ]
})
export class SharedModule { }
