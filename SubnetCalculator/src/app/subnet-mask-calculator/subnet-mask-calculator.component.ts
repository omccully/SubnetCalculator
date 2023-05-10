import { Component, OnInit } from '@angular/core';
import { Address32 } from 'src/app/lib/address32';

@Component({
  selector: 'app-subnet-mask-calculator',
  templateUrl: './subnet-mask-calculator.component.html',
  styleUrls: ['./subnet-mask-calculator.component.scss']
})
export class SubnetMaskCalculatorComponent implements OnInit {

  public subnetMasks?: string[];

  public selectedSubnetMask = "255.255.0.0";

  constructor() {
    this.subnetMasks = Array<string>();

    for (var i = 8; i < 31; i++) {
      var binaryString = "1".repeat(i) + "0".repeat(32 - i);
      var dottedDecimal = Address32.binaryToDottedDecimal(binaryString);
      this.subnetMasks.push(dottedDecimal);
    }
  }

  ngOnInit(): void {
  }

  public onSelectSubnet(selectedSubnetMask: string) {
    this.selectedSubnetMask = selectedSubnetMask;
  }
}


