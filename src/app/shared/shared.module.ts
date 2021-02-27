import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CelebrityCardComponent } from './components/celebrity-card/celebrity-card.component';



@NgModule({
  declarations: [CelebrityCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CelebrityCardComponent
  ]
})
export class SharedModule { }
