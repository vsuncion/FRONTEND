import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejerosEditarComponent } from './consejeros-editar.component';

describe('ConsejerosEditarComponent', () => {
  let component: ConsejerosEditarComponent;
  let fixture: ComponentFixture<ConsejerosEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsejerosEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejerosEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
