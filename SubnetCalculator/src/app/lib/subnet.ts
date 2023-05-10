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

  public get firstHostSubAddress(): number {
    return this.networkSuffix + 1;
  }

  public get lastHostSubAddress(): number {
    return (this.networkSuffix + this.subnetMask.subnetSpread) -
      SubnetMask.InvalidHostsPerSubnet;
  }

  public toString = (): string => {
    return this.subnetMask.networkPrefix + this.networkSuffix + this.subnetMask.hostSuffix;
  }
}
