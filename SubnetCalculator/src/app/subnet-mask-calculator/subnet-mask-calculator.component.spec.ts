import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetMaskCalculatorComponent } from './subnet-mask-calculator.component';

describe('SubnetMaskCalculatorComponent', () => {
  let component: SubnetMaskCalculatorComponent;
  let fixture: ComponentFixture<SubnetMaskCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubnetMaskCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetMaskCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
