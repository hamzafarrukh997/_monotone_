/** Tiny className joiner — filters falsy values. Keeps component APIs tidy. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
