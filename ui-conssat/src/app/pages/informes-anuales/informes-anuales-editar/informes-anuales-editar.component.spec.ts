import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesAnualesEditarComponent } from './informes-anuales-editar.component';

describe('InformesAnualesEditarComponent', () => {
  let component: InformesAnualesEditarComponent;
  let fixture: ComponentFixture<InformesAnualesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformesAnualesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesAnualesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
