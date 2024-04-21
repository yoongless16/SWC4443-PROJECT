import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcoachComponent } from './viewcoach.component';

describe('ViewcoachComponent', () => {
  let component: ViewcoachComponent;
  let fixture: ComponentFixture<ViewcoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcoachComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
