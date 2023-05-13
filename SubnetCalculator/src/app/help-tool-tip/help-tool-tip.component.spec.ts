import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpToolTipComponent } from './help-tool-tip.component';

describe('HelpToolTipComponent', () => {
  let component: HelpToolTipComponent;
  let fixture: ComponentFixture<HelpToolTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpToolTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpToolTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
