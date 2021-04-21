import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinesVerComponent } from './boletines-ver.component';

describe('BoletinesVerComponent', () => {
  let component: BoletinesVerComponent;
  let fixture: ComponentFixture<BoletinesVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletinesVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletinesVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
