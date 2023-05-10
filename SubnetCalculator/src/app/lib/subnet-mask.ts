import { Address32 } from './address32';
import { Subnet } from './subnet';

export class SubnetMask extends Address32 {
  public static readonly InvalidHostsPerSubnet: number = 2;

  constructor(dottedDecimal: string) {
    super(dottedDecimal);


  }

  public get subnetPrefixLength(): number {
    return this.binary.indexOf('0');
  }

  public get networkPrefixLength(): number {
    var subnetPrefixLength = this.subnetPrefixLength;
    if (subnetPrefixLength >= 24) return 24;
    if (subnetPrefixLength >= 16) return 16;
    if (subnetPrefixLength >= 8) return 8;
    return 0;
  }

  public get class(): string {
    switch (this.subnetPrefixLength) {
      case 8:
        return "A";
      case 16:
        return "B";
      case 24:
        return "C";
    }
    return "N/A";
  }

  public get hostsPerSubnets(): number {
    var InvalidHostsPerSubnet = 2;

    return Math.pow(2, 32 - this.subnetPrefixLength) - InvalidHostsPerSubnet;
  }

  public get subnetworksCount(): number {
    return Math.pow(2,
      this.subnetPrefixLength - this.networkPrefixLength);
  }

  public get subnetSpread(): number {
    return Math.pow(2,
      Math.abs(this.subnetPrefixLength - this.networkPrefixLength - 8));
  }

  public get subnets(): Subnet[] {
    var subnets: Subnet[] = [];
    for (var i = 0; i < this.subnetworksCount; i++) {
      subnets.push(new Subnet(this, i));
    }

    return subnets;
  }

  public get networkPrefix(): string {
    switch (this.networkPrefixLength) {
      case 0:
        return "";
      case 8:
        return "NNN.";
      case 16:
        return "NNN.NNN.";
      case 24:
        return "NNN.NNN.NNN.";
      default:
        throw new Error("Invalid");
    }
  }

  public get hostSuffix(): string {
    switch (this.networkPrefixLength) {
      case 0:
        return ".HHH.HHH.HHH";
      case 8:
        return ".HHH.HHH";
      case 16:
        return ".HHH";
      case 24:
        return "";
      default:
        throw new Error("Invalid");
    }
  }
}



export interface subnet {
  subnetBinary: string;
  address: string;
  minHostNum: number;
  maxHostNum: number;
}
