import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsejerosComponent } from './consejeros.component';

describe('ConsejerosComponent', () => {
  let component: ConsejerosComponent;
  let fixture: ComponentFixture<ConsejerosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsejerosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsejerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
