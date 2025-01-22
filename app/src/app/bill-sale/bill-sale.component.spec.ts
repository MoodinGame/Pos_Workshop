import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillSaleComponent } from './bill-sale.component';

describe('BillSaleComponent', () => {
  let component: BillSaleComponent;
  let fixture: ComponentFixture<BillSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillSaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
