import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTypeComponent } from './food-type.component';

describe('FoodTypeComponent', () => {
  let component: FoodTypeComponent;
  let fixture: ComponentFixture<FoodTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
