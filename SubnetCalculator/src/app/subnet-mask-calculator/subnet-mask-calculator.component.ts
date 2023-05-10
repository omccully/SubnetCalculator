import { Component, OnInit } from '@angular/core';

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

    this.subnetMasks.push("255.0.0.0");
    this.subnetMasks.push("255.255.0.0");
    this.subnetMasks.push("255.255.255.0");
   

  }

  ngOnInit(): void {
  }

}


