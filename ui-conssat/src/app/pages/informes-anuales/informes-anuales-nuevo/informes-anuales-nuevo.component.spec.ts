import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesAnualesNuevoComponent } from './informes-anuales-nuevo.component';

describe('InformesAnualesNuevoComponent', () => {
  let component: InformesAnualesNuevoComponent;
  let fixture: ComponentFixture<InformesAnualesNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformesAnualesNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesAnualesNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
