import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CelebritiesRoutingModule } from './celebrities-routing.module';
import { CelebritiesListComponent } from './components/celebrities-list/celebrities-list.component';


@NgModule({
  declarations: [CelebritiesListComponent],
  imports: [
    CommonModule,
    CelebritiesRoutingModule
  ]
})
export class CelebritiesModule { }
