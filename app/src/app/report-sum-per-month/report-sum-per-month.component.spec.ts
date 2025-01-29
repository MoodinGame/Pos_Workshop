import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSumPerMonthComponent } from './report-sum-per-month.component';

describe('ReportSumPerMonthComponent', () => {
  let component: ReportSumPerMonthComponent;
  let fixture: ComponentFixture<ReportSumPerMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportSumPerMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSumPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
