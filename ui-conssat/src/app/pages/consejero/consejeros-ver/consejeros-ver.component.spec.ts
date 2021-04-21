import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejerosVerComponent } from './consejeros-ver.component';

describe('ConsejerosVerComponent', () => {
  let component: ConsejerosVerComponent;
  let fixture: ComponentFixture<ConsejerosVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsejerosVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejerosVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
