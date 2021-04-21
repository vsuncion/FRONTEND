import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinesComponent } from './boletines.component';

describe('BoletinesComponent', () => {
  let component: BoletinesComponent;
  let fixture: ComponentFixture<BoletinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
