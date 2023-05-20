
/**
 * Represents a 32 bit IPv4 network address.
 */
export class Address32 {
  public readonly bytes: ReadonlyArray<number>;

  constructor(dottedDecimal: string) {
    var regex = new RegExp('^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)$');
    var result = regex.exec(dottedDecimal);
    if (result == null) {
      throw new Error("Failed match");
    }

    this.bytes = [parseInt(result[1]), parseInt(result[2]),
    parseInt(result[3]), parseInt(result[4])];

    if (!this.bytes.every((b) => (0 <= b && b <= 255))) {
      throw new Error("Address octet out of range for byte")
    }
  }

  public get dottedDecimal(): string {
    return this.bytes.join('.');
  }

  public get dottedBinary(): string {
    return this.bytes.map(b => this.byteToBinary(b)).join(".");
  }

  public get binary(): string {
    return this.bytes.map(b => this.byteToBinary(b)).join("");
  }

  public get inverted(): Address32 {
    return new Address32(this.bytes.map(b => 255 - b).join("."));
  }

  private byteToBinary(byte: number): string {
    return byte.toString(2).padStart(8, "0");
  }

  private static parseBinaryBytes(binary: string): number[] {
    var result: number[] = [];
    for (var i = 0; i < binary.length; i += 8) {
      var byte = parseInt(binary.substring(i, i + 8), 2);
      result.push(byte);
    }
    return result;
  }

  public static binaryToDottedDecimal(binary: string): string {
    var binaryNoDots = binary.replace(".", "");
    if (binaryNoDots.length != 32) {
      throw new Error("Binary should be 32 bits long");
    }

    return Address32.parseBinaryBytes(binary).join(".");
  }
}
