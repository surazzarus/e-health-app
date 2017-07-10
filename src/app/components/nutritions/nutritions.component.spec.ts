import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionsComponent } from './nutritions.component';

describe('NutritionsComponent', () => {
  let component: NutritionsComponent;
  let fixture: ComponentFixture<NutritionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
