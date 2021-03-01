import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidate-card-form',
  templateUrl: './candidate-card-form.component.html',
  styleUrls: ['./candidate-card-form.component.scss']
})
export class CandidateCardFormComponent implements OnInit {


  @Output() saveVote = new EventEmitter();

  form: FormGroup | undefined;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      vote: ['positive', [Validators.required]]
    });
  }

  vote(value: string, event: any): void {
    if (!this.form) { return; }
    event.preventDefault();
    this.form.controls.vote.setValue(value);
  }

  saveVoteForm(): void {
    if (!this.form) { return; }
    const voteValue = this.form.controls.vote.value;
    this.saveVote.emit(voteValue);
  }

}
