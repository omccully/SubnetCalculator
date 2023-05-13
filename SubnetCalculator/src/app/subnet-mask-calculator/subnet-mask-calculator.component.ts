import { Component, OnInit } from '@angular/core';
import { Address32 } from 'src/app/lib/address32';
import { SubnetMask } from 'src/app/lib/subnet-mask';

@Component({
  selector: 'app-subnet-mask-calculator',
  templateUrl: './subnet-mask-calculator.component.html',
  styleUrls: ['./subnet-mask-calculator.component.scss']
})
export class SubnetMaskCalculatorComponent implements OnInit {

  public subnetMasks?: string[];

  public selectedSubnetMask!: string;
  public selectedSubnetMaskBinary!: string;
  public selectedSubnetMaskOneBitCount: number | null = null;

  constructor() {
    this.subnetMasks = Array<string>();

    for (var i = 8; i < 31; i++) {
      var binaryString = "1".repeat(i) + "0".repeat(32 - i);
      var dottedDecimal = Address32.binaryToDottedDecimal(binaryString);
      this.subnetMasks.push(dottedDecimal);
    }

    this.setSelectedSubnetMask("255.255.0.0");
  }

  ngOnInit(): void {
  }

  public onSliderChange(event: any) {
    console.log(event.value);

    var newOneBitCoun: number = parseInt(event.value);

    if (this.selectedSubnetMaskOneBitCount == newOneBitCoun) return;

    this.selectedSubnetMaskOneBitCount = newOneBitCoun;
    if (newOneBitCoun) {
      var subnetMaskObj = SubnetMask.fromOneCount(newOneBitCoun);
      this.setSelectedSubnetMask(subnetMaskObj.dottedBytes);
    }

  }

  private setSelectedSubnetMask(selectedSubnetMask: string) {
    console.log(this.selectedSubnetMaskOneBitCount);
    this.selectedSubnetMask = selectedSubnetMask;
    var subnetMaskObj = new SubnetMask(selectedSubnetMask);
    this.selectedSubnetMaskBinary = subnetMaskObj.dottedBinary;
    this.selectedSubnetMaskOneBitCount = subnetMaskObj.subnetPrefixLength;
    console.log(this.selectedSubnetMaskOneBitCount);
    
  }

  public onSelectSubnet(selectedSubnetMask: string) {
    this.setSelectedSubnetMask(selectedSubnetMask);
  }

  public onBitSliderChange() {

  }

  public onMoveUp(event: any) {
    this.tryMove(-1);
    event.preventDefault();
    event.stopPropagation();
    console.log(event.constructor.name);
  }

  public onMoveDown(event: any) {
    this.tryMove(1);
    event.preventDefault();
    event.stopPropagation();
    console.log(event.constructor.name);
  }

  private tryMove(indexChange: number) {
    if (!this.subnetMasks) return;
    var selectedIndex = this.subnetMasks.indexOf(this.selectedSubnetMask);
    var nextIndex = selectedIndex + indexChange;
    this.tryMoveToIndex(nextIndex);
  }

  private tryMoveToIndex(index: number) {
    if (!this.subnetMasks) return;
    if (0 <= index && index < this.subnetMasks.length) {
      this.setSelectedSubnetMask(this.subnetMasks[index]);
      document.getElementById("sm_" + this.selectedSubnetMask)?.scrollIntoView();
    }
  }
}
