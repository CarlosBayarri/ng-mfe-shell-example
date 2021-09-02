import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mfe3Component } from './mfe3.component';

describe('Mfe3Component', () => {
  let component: Mfe3Component;
  let fixture: ComponentFixture<Mfe3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mfe3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Mfe3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
