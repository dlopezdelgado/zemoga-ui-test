import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CelebritiesRoutingModule } from './celebrities-routing.module';
import { CelebritiesListComponent } from './components/celebrities-list/celebrities-list.component';
import { CelebrityCardComponent } from './components/celebrity-card/celebrity-card.component';


@NgModule({
  declarations: [CelebritiesListComponent, CelebrityCardComponent],
  imports: [
    CommonModule,
    CelebritiesRoutingModule
  ]
})
export class CelebritiesModule { }
