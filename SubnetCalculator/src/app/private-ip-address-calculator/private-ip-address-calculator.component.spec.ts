import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateIpAddressCalculatorComponent } from './private-ip-address-calculator.component';

describe('PrivateIpAddressCalculatorComponent', () => {
  let component: PrivateIpAddressCalculatorComponent;
  let fixture: ComponentFixture<PrivateIpAddressCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateIpAddressCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateIpAddressCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
