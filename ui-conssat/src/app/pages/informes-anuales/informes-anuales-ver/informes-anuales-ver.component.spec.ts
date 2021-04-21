import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesAnualesVerComponent } from './informes-anuales-ver.component';

describe('InformesAnualesVerComponent', () => {
  let component: InformesAnualesVerComponent;
  let fixture: ComponentFixture<InformesAnualesVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformesAnualesVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformesAnualesVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
