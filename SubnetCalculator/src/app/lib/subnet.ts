import { SubnetMask } from './subnet-mask';

/**
 * Represents a possible subnet.
 */
export class Subnet {
  private subnetMask: SubnetMask;
  private subnetIndex: number;

  constructor(subnetMask: SubnetMask, subnetIndex: number) {
    this.subnetMask = subnetMask;
    this.subnetIndex = subnetIndex;
  }

  /**
   * The value for the octet that is being subnetted.
   */
  public get subnettedByteValue(): number {
    return this.subnetMask.subnetSpread * this.subnetIndex;
  }

  /**
   * Gets a binary representation of the bits in the subnet that are unique for this subnet.
   * Example: A subnet mask 255.255.192.0 will produce 4 subnets with the following
   *          subnets: 00, 01, 10, and 11.
   */
  public get identifierBits(): string {
    var subnettedByteBinary = this.subnettedByteValue.toString(2).padStart(8, "0");
    var subnettedBitCount = this.subnetMask.networkBitCount -
      this.subnetMask.classfulNetworkBitCount;
    return subnettedByteBinary.substring(0, subnettedBitCount);
  }

  public get firstHostAddress(): string {
    switch (this.subnetMask.classfulNetworkBitCount) {
      case 0:
        return this.subnettedByteValue + ".0.0.1";
      case 8:
        return `n.${this.subnettedByteValue}.0.1`;
      case 16:
        return `n.n.${this.subnettedByteValue}.1`;
      case 24:
        return `n.n.n.${this.subnettedByteValue + 1}`;
      default:
        throw new Error("Invalid");
    }
  }

  public get lastHostAddress(): string {
    var nextSubAddr = this.subnettedByteValue + this.subnetMask.subnetSpread;
    switch (this.subnetMask.classfulNetworkBitCount) {
      case 0:
        return `${nextSubAddr-1}.255.255.254`;
      case 8:
        return `n.${nextSubAddr-1}.255.254`;
      case 16:
        return `n.n.${nextSubAddr-1}.254`;
      case 24:
        // sutract 2 in this case to exclude the broadcast address
        return `n.n.n.${nextSubAddr-2}`;
      default:
        throw new Error("Invalid");
    }
  }

  public toString = (): string => {
    return this.subnetMask.networkPrefix + this.subnettedByteValue + this.subnetMask.subnetSuffix;
  }
}
