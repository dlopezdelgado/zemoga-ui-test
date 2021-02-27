import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CelebrityCardComponent } from '../celebrity-card/celebrity-card.component';

import { CelebritiesListComponent } from './celebrities-list.component';

describe('CelebritiesListComponent', () => {
  let component: CelebritiesListComponent;
  let fixture: ComponentFixture<CelebritiesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CelebritiesListComponent, CelebrityCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelebritiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
