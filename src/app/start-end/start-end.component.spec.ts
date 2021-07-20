import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEndComponent } from './start-end.component';

describe('StartEndComponent', () => {
  let component: StartEndComponent;
  let fixture: ComponentFixture<StartEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartEndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
