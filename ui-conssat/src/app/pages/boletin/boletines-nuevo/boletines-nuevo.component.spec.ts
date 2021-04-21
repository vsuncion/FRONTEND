import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinesNuevoComponent } from './boletines-nuevo.component';

describe('BoletinesNuevoComponent', () => {
  let component: BoletinesNuevoComponent;
  let fixture: ComponentFixture<BoletinesNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletinesNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletinesNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
