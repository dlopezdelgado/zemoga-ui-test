import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelebrityCardComponent } from './celebrity-card.component';

describe('CelebrityCardComponent', () => {
  let component: CelebrityCardComponent;
  let fixture: ComponentFixture<CelebrityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelebrityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebrityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
