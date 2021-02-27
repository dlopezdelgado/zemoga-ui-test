import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, LayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
