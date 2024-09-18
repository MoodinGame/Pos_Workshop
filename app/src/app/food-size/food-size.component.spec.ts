import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSizeComponent } from './food-size.component';

describe('FoodSizeComponent', () => {
  let component: FoodSizeComponent;
  let fixture: ComponentFixture<FoodSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodSizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
