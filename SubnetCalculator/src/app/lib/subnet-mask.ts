import { Address32 } from './address32';
import { Subnet } from './subnet';

export class SubnetMask extends Address32 {
  public static readonly InvalidHostsPerSubnet: number = 2;

  constructor(dottedDecimal: string) {
    super(dottedDecimal);
  }

  public get subnetPrefixLength(): number {
    const newLocal = this.binary.indexOf('0');
    if (newLocal == -1) return 32;
    return newLocal;
  }

  public get networkPrefixLength(): number {
    var subnetPrefixLength = this.subnetPrefixLength;
    if (subnetPrefixLength >= 24) return 24;
    if (subnetPrefixLength >= 16) return 16;
    if (subnetPrefixLength >= 8) return 8;
    return 0;
  }

  private customClassText(classChar: string): string {
    return `Class ${classChar} subnet — custom subnet mask`;
  }

  private defaultClassText(classChar: string): string {
    return `Class ${classChar} network — default subnet mask`;
  }

  public get class(): string {
    if (this.subnetPrefixLength > 24) {
      return this.customClassText("C");
    } else if (this.subnetPrefixLength == 24) {
      return this.defaultClassText("C");
    } else if (this.subnetPrefixLength > 16) {
      return this.customClassText("B");
    } else if (this.subnetPrefixLength == 16) {
      return this.defaultClassText("B");
    } else if (this.subnetPrefixLength > 8) {
      return this.customClassText("A");
    } else if (this.subnetPrefixLength == 8) {
      return this.defaultClassText("A");
    } else {
      return "N/A";
    }
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
        return "n.";
      case 16:
        return "n.n.";
      case 24:
        return "n.n.n.";
      default:
        throw new Error("Invalid");
    }
  }

  public get subnetSuffix(): string {
    switch (this.networkPrefixLength) {
      case 0:
        return ".0.0.0";
      case 8:
        return ".0.0";
      case 16:
        return ".0";
      case 24:
        return "";
      default:
        throw new Error("Invalid");
    }
  }

  public static fromOneCount(oneCount: number): SubnetMask {
    if (oneCount < 0) throw new Error("oneCount must be greater or equal to 0");
    if (oneCount > 32) throw new Error("oneCount must be less than 32");
    var binary: string = '1'.repeat(oneCount) + '0'.repeat(32 - oneCount);
    var dottedDecimal: string = Address32.binaryToDottedDecimal(binary);
    return new SubnetMask(dottedDecimal);
  }
}



export interface subnet {
  subnetBinary: string;
  address: string;
  minHostNum: number;
  maxHostNum: number;
}
