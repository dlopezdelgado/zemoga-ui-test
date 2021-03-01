import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesListComponent } from './components/candidates-list/candidates-list.component';
import { CandidateCardComponent } from './components/candidate-card/candidate-card.component';
import { SharedModule } from '../shared/shared.module';
import { CandidateCardFormComponent } from './components/candidate-card-form/candidate-card-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CandidatesListComponent, CandidateCardComponent, CandidateCardFormComponent],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CandidatesModule { }
