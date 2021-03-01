import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CandidateCardFormComponent } from './candidate-card-form.component';

describe('CandidateCardFormComponent', () => {
  let component: CandidateCardFormComponent;
  let fixture: ComponentFixture<CandidateCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateCardFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#vote', () => {

    it(`Should return undefined when form doesn't exist`, () => {
      // Arrange
      component.form = undefined;
      const value = 'positive';
      const event = jasmine.createSpyObj('e', ['preventDefault']);

      // Act
      const res = component.vote(value, event);

      // Assert
      expect(res).toBeUndefined();
    });


    it('Should set vote value to the received param', () => {

      // Arrange
      const value = 'positive';
      const event = jasmine.createSpyObj('e', ['preventDefault']);

      // Act
      component.vote(value, event);

      // Assert
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.form?.controls.vote.value).toEqual(value);
    });
  });


  describe('#saveVoteForm', () => {

    it(`Should return undefined when form doesn't exist`, () => {
      // Arrange
      component.form = undefined;

      // Act
      const res = component.saveVoteForm();

      // Assert
      expect(res).toBeUndefined();
    });

    it('Should emit saveVote with value from vote form field', () => {
      // Arrange
      const vote = 'positive';

      spyOn(component.saveVote, 'emit');


      component.form?.setValue({
        vote
      });

      // Act
      component.saveVoteForm();

      // Assert
      expect(component.saveVote.emit).toHaveBeenCalledWith(vote);

    });

  });


});
