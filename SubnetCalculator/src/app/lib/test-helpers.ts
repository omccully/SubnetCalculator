
export class TestHelpers {
  public static escapeRegex(regex: string): string {
    return regex.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  }
}
