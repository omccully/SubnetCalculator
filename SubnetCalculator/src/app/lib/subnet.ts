import { SubnetMask } from './subnet-mask';

export class Subnet {
  private subnetMask: SubnetMask;
  private subnetIndex: number;

  constructor(subnetMask: SubnetMask, subnetIndex: number) {
    this.subnetMask = subnetMask;
    this.subnetIndex = subnetIndex;
  }

  public get networkSuffix(): number {
    return this.subnetMask.subnetSpread * this.subnetIndex;
  }

  public get networkBits(): string {
    var subaddressBinary = this.networkSuffix.toString(2).padStart(8, "0");
    var subnetBitCount = this.subnetMask.subnetPrefixLength -
      this.subnetMask.networkPrefixLength;
    return subaddressBinary.substring(0, subnetBitCount);
  }

  public get firstHostAddress(): string {
    switch (this.subnetMask.networkPrefixLength) {
      case 0:
        return this.networkSuffix + ".0.0.1";
      case 8:
        return `n.${this.networkSuffix}.0.1`;
      case 16:
        return `n.n.${this.networkSuffix}.1`;
      case 24:
        return `n.n.n.${this.networkSuffix + 1}`;
      default:
        throw new Error("Invalid");
    }
  }

  public get lastHostAddress(): string {
    var nextSubAddr = this.networkSuffix + this.subnetMask.subnetSpread;
    switch (this.subnetMask.networkPrefixLength) {
      case 0:
        return `${nextSubAddr-1}.255.255.254`;
      case 8:
        return `n.${nextSubAddr-1}.255.254`;
      case 16:
        return `n.n.${nextSubAddr-1}.254`;
      case 24:
        return `n.n.n.${nextSubAddr-2}`;
      default:
        throw new Error("Invalid");
    }
  }

  public toString = (): string => {
    return this.subnetMask.networkPrefix + this.networkSuffix + this.subnetMask.subnetSuffix;
  }
}
