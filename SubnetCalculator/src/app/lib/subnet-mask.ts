import { Address32 } from './address32';
import { Subnet } from './subnet';

/**
 * Represents a 32 bit IPv4 subnet mask.
 */
export class SubnetMask extends Address32 {
  public static readonly InvalidHostsPerSubnet: number = 2;

  constructor(dottedDecimal: string) {
    super(dottedDecimal);
  }

  public get networkBitCount(): number {
    const newLocal = this.binary.indexOf('0');
    if (newLocal == -1) {
      // no 0 bits found. the subnet mask is all 1 bits
      return 32;
    }
    return newLocal;
  }

  /**
   * The number of 1 bits in the subnet mask that are a part of a complete byte.
   * The term "classful" refers to the default subnet mask for a classful IP
   * The class defaults are 255.0.0.0, 255.255.0.0, and 255.255.255.0
   */
  public get classfulNetworkBitCount(): number {
    var networkBitCount = this.networkBitCount;
    if (networkBitCount >= 24) return 24;
    if (networkBitCount >= 16) return 16;
    if (networkBitCount >= 8) return 8;
    return 0;
  }

  private customClassText(classChar: string): string {
    return `Class ${classChar} subnet — custom subnet mask`;
  }

  private defaultClassText(classChar: string): string {
    return `Class ${classChar} network — default subnet mask`;
  }

  public get class(): string {
    if (this.networkBitCount > 24) {
      return this.customClassText("C");
    } else if (this.networkBitCount == 24) {
      return this.defaultClassText("C");
    } else if (this.networkBitCount > 16) {
      return this.customClassText("B");
    } else if (this.networkBitCount == 16) {
      return this.defaultClassText("B");
    } else if (this.networkBitCount > 8) {
      return this.customClassText("A");
    } else if (this.networkBitCount == 8) {
      return this.defaultClassText("A");
    } else {
      return "N/A";
    }
  }

  public get hostsPerSubnets(): number {
    var InvalidHostsPerSubnet = 2;

    return Math.pow(2, 32 - this.networkBitCount) - InvalidHostsPerSubnet;
  }

  /**
   * The number of subnetworks that exist within the next-biggest class default subnet mask.
   * For example, 255.255.128.0 creates 2 more subnets out of the 255.255.0.0 subnet mask.
   */
  public get subnetworksCount(): number {
    return Math.pow(2,
      this.networkBitCount - this.classfulNetworkBitCount);
  }

  /**
   * For the octet being subnetted, this method returns the difference between
   * the octet's value for each subnet.
   * For example, the subnets 255.192.0.0, 255.255.192.0, and 255.255.255.192 will all
   * return 64 here.
   */
  public get subnetSpread(): number {
    return Math.pow(2,
      Math.abs(this.networkBitCount - this.classfulNetworkBitCount - 8));
  }

  public get subnets(): Subnet[] {
    var subnets: Subnet[] = [];
    for (var i = 0; i < this.subnetworksCount; i++) {
      subnets.push(new Subnet(this, i));
    }

    return subnets;
  }

  public get networkPrefix(): string {
    switch (this.classfulNetworkBitCount) {
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
    switch (this.classfulNetworkBitCount) {
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
