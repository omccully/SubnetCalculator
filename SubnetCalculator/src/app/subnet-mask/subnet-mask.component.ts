import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subnet-mask',
  templateUrl: './subnet-mask.component.html',
  styleUrls: ['./subnet-mask.component.scss']
})
export class SubnetMaskComponent implements OnInit {

  @Input() subnetMask!: string;

  public binary?: string;

  public class?: string;

  public hostsPerSubnet?: number;

  public numberOfSubnets?: number;

  public subnets?: subnet[]

  constructor() { }

  ngOnInit(): void {
    
  }
}

interface subnet {
  subnetBinary: string;
  address: string;
  minHostNum: number;
  maxHostNum: number;
}
