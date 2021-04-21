import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionesFirmanteComponent } from './sesiones-firmante.component';

describe('SesionesFirmanteComponent', () => {
  let component: SesionesFirmanteComponent;
  let fixture: ComponentFixture<SesionesFirmanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionesFirmanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionesFirmanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
