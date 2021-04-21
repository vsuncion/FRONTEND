import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejerosNuevoComponent } from './consejeros-nuevo.component';

describe('ConsejerosNuevoComponent', () => {
  let component: ConsejerosNuevoComponent;
  let fixture: ComponentFixture<ConsejerosNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsejerosNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejerosNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
