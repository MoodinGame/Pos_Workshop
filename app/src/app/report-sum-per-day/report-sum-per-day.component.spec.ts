import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSumPerDayComponent } from './report-sum-per-day.component';

describe('ReportSumPerDayComponent', () => {
  let component: ReportSumPerDayComponent;
  let fixture: ComponentFixture<ReportSumPerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportSumPerDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSumPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
