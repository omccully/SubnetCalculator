import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { SubnetMask } from 'src/app/lib/subnet-mask';
import { Subnet } from 'src/app/lib/subnet';

@Component({
  selector: 'app-subnet-mask',
  templateUrl: './subnet-mask.component.html',
  styleUrls: ['./subnet-mask.component.scss']
})
export class SubnetMaskComponent implements OnInit, OnChanges {

  @Input() subnetMask!: string;

  public binary?: string;

  public class?: string;

  public hostsPerSubnet?: number;

  public numberOfSubnets?: number;

  public subnets?: Subnet[]

  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    var subnetMask = new SubnetMask(this.subnetMask);

    this.binary = subnetMask.dottedBinary;
    this.class = subnetMask.class;
    this.hostsPerSubnet = subnetMask.hostsPerSubnets;
    this.numberOfSubnets = subnetMask.subnetworksCount;
    this.subnets = subnetMask.subnets;
  }
}
