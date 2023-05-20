import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, SimpleChanges, SimpleChange } from '@angular/core';
import { SubnetMaskComponent } from './subnet-mask.component';
import { AngularMaterialModule } from '../angular-material.module';
import { HelpToolTipComponent } from '../help-tool-tip/help-tool-tip.component';
import { TestHelpers } from 'src/app/lib/test-helpers';

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

  function expectElementTextMatch(elementSelector: string, regex: string) {
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector(elementSelector);
    const textContent = element?.textContent;
    expect(textContent).toMatch(regex)
  }

  function expectInfoElement(elementSelector: string, expectedLabel: string, expectedValue: string) {
    const regex = TestHelpers.escapeRegex(expectedLabel) + '.+: ' + TestHelpers.escapeRegex(expectedValue);
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
    expectInfoElement(".sn-info-number-f-subnets", 'Number of subnets', '4');
  });

  it('should display wildcard mask', () => {
    const subnetMask = "255.192.0.0";
    initializeSubnetMaskInput(subnetMask);
    expectInfoElement(".sn-info-wildcard-mask", 'Wildcard mask', '0.63.255.255');
  });

  it('should display table of possible subnets', () => {
    const subnetMask = "255.192.0.0";
    initializeSubnetMaskInput(subnetMask);

    const compiled = fixture.nativeElement as HTMLElement;
    const table = compiled.querySelector('.sn-possible-subnets-table');
    const tbody = table!.querySelector('tbody');
    const expectedData = [
      ["00", "n.0.0.0", "n.0.0.1 - n.63.255.254"],
      ["01", "n.64.0.0", "n.64.0.1 - n.127.255.254"],
      ["10", "n.128.0.0", "n.128.0.1 - n.191.255.254"],
      ["11", "n.192.0.0", "n.192.0.1 - n.255.255.254"]
    ];

    let actualData = new Array();
    tbody!.querySelectorAll('tr').forEach((row: HTMLTableRowElement) => {
      const binary = row.children[0].textContent;
      const network = row.children[1].textContent;
      const range = row.children[2].textContent;
      
      actualData.push([binary, network, range]);
    });
    
    expect(actualData.length).toEqual(expectedData.length);
    expect(actualData).toEqual(expectedData);
  });
});
