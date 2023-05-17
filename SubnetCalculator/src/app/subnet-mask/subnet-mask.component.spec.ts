import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, SimpleChanges, SimpleChange } from '@angular/core';
import { SubnetMaskComponent } from './subnet-mask.component';
import { AngularMaterialModule } from '../angular-material.module';
import { HelpToolTipComponent } from '../help-tool-tip/help-tool-tip.component';

describe('SubnetMaskComponent', () => {
  let component: SubnetMaskComponent;
  let fixture: ComponentFixture<SubnetMaskComponent>;

  function initializeSubnetMaskInput(subnetMask: string) {
    component.subnetMask = subnetMask;
    component.ngOnChanges({
      "subnetMask": new SimpleChange(null, subnetMask, true)
    })
    fixture.detectChanges();
  }

  function escapeRegex(regex: string) {
    return regex.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  function expectElementTextMatch(elementSelector: string, regex: string) {
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector(elementSelector);
    const textContent = element?.textContent;
    expect(textContent).toMatch(regex)
  }

  function expectInfoElement(elementSelector: string, expectedLabel: string, expectedValue: string) {
    const regex = escapeRegex(expectedLabel) + '.+: ' + escapeRegex(expectedValue);
    expectElementTextMatch(elementSelector, regex);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SubnetMaskComponent,
        HelpToolTipComponent
      ],
      imports: [
        AngularMaterialModule
      ]
    })
    .compileComponents();
  }); 

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display slash notation', () => {
    const subnetMask = "255.255.0.0";
    initializeSubnetMaskInput(subnetMask);
    expectInfoElement('.sn-info-slash-notation', 'Slash notation', '/16');
  });

  it('should display hosts per subnet', () => {
    const subnetMask = "255.255.0.0";
    initializeSubnetMaskInput(subnetMask);
    expectInfoElement('.sn-info-hosts-per-subnet', 'Hosts per subnet', '65534');
  });

  it('should display number of subnets', () => {
    const subnetMask = "255.192.0.0";
    initializeSubnetMaskInput(subnetMask);
    expectInfoElement(".sn-info-number-of-subnets", 'Number of subnets', '4');
  });
});
