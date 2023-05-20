import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubnetMaskComponent } from '../subnet-mask/subnet-mask.component';
import { SubnetMaskCalculatorComponent } from './subnet-mask-calculator.component';
import { AngularMaterialModule } from '../angular-material.module';
import { HelpToolTipComponent } from '../help-tool-tip/help-tool-tip.component';
import { TestHelpers } from 'src/app/lib/test-helpers';

describe('SubnetMaskCalculatorComponent', () => {
  let component: SubnetMaskCalculatorComponent;
  let fixture: ComponentFixture<SubnetMaskCalculatorComponent>;

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
      declarations: [SubnetMaskCalculatorComponent,
        SubnetMaskComponent
      ],
      imports: [
        AngularMaterialModule
      ]
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

  it('should display subnet masks in side drawer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navList = compiled.querySelector('mat-drawer mat-nav-list');
    const subnetMaskList = Array.from(navList!.querySelectorAll('a')).map(item => {
      return item.textContent;
    });
    const expectedSubnetMaskList = [
      "255.0.0.0", "255.128.0.0", "255.192.0.0",
      "255.224.0.0", "255.240.0.0", "255.248.0.0",
      "255.252.0.0", "255.254.0.0", "255.255.0.0",
      "255.255.128.0", "255.255.192.0", "255.255.224.0",
      "255.255.240.0", "255.255.248.0", "255.255.252.0",
      "255.255.254.0", "255.255.255.0", "255.255.255.128",
      "255.255.255.192", "255.255.255.224", "255.255.255.240",
      "255.255.255.248", "255.255.255.252"
    ]

    expect(subnetMaskList).toEqual(expectedSubnetMaskList);
  });

  it('should display selected subnet mask when clicked', () => {
    const expectedSubnetMask = "255.192.0.0";
    const expectedBinary = '11111111.11000000.00000000.00000000';
    const compiled = fixture.nativeElement as HTMLElement;
    const anchorElement = Array.from(compiled.querySelectorAll('mat-drawer mat-nav-list a'))
      .find(item => item.textContent === expectedSubnetMask) as HTMLAnchorElement;
      
    anchorElement.click();
    fixture.detectChanges();

    expect(component.selectedSubnetMask).toEqual(expectedSubnetMask);
    expect(component.selectedSubnetMaskBinary)
      .toEqual(expectedBinary);
    expect(component.selectedSubnetMaskOneBitCount).toEqual(10);

    expect(compiled.querySelector('.snm_header')!.textContent)
      .toContain(expectedSubnetMask);
    expectInfoElement('.snm_info_binary', 'Binary', expectedBinary);
  });

  it('should display selected subnet mask when slider changed', () => {
    const expectedSubnetMask = "255.192.0.0";

    // could not come up with a good way to do this
    // test involving the actual slider element

    component.selectedSubnetMaskOneBitCount = 10;
    component.onSliderChange(null);
    fixture.detectChanges();

    expect(component.selectedSubnetMask).toEqual(expectedSubnetMask);
    expect(component.selectedSubnetMaskBinary).toEqual('11111111.11000000.00000000.00000000');
    expect(component.selectedSubnetMaskOneBitCount).toEqual(10);
  });
});
