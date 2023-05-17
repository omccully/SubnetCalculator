import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, SimpleChanges, SimpleChange } from '@angular/core';
import { SubnetMaskComponent } from './subnet-mask.component';
import { AngularMaterialModule } from '../angular-material.module';
import { HelpToolTipComponent } from '../help-tool-tip/help-tool-tip.component';

describe('SubnetMaskComponent', () => {
  let component: SubnetMaskComponent;
  let fixture: ComponentFixture<SubnetMaskComponent>;

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
    component.subnetMask = subnetMask;
    component.ngOnChanges({
      "subnetMask": new SimpleChange(null, subnetMask, true)
    })
    expect(component.oneBitCount).toEqual(16);

    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const element = compiled.querySelector('.sn-info-slash-notation');
    const textContent = element?.textContent;
    expect(textContent).toMatch('Slash notation:.+\/16')
  });
});

//@Component({
//  selector: 'app-help-tool-tip',
//  template: ''
//})
//class MockHelpToolTipComponent {
//}
