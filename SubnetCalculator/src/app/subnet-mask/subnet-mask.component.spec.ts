import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetMaskComponent } from './subnet-mask.component';

describe('SubnetMaskComponent', () => {
  let component: SubnetMaskComponent;
  let fixture: ComponentFixture<SubnetMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubnetMaskComponent ]
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
});
