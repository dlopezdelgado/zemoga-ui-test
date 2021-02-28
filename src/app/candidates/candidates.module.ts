import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CandidatesListComponent, CandidateCardComponent],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    SharedModule
  ]
})
export class CandidatesModule { }
