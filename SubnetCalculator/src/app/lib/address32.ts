
export class Address32 {
  public readonly bytes: number[];

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

  public get dottedBytes(): string {
    return this.bytes.join('.');
  }

  public get dottedBinary(): string {
    return this.bytes.map(b => this.byteToBinary(b)).join(".");
  }

  public get binary() {
    return this.bytes.map(b => this.byteToBinary(b)).join("");
  }

  private byteToBinary(byte: number): string {
    return byte.toString(2).padStart(8, "0");
  }
}
