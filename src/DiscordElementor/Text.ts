/**
 * Represents a dictionary of tags.
 */
export type Tags = Record<string, string>;

/**
* Replaces placeholders in the input string with the provided replacements.
* @param input The string to transmorph.
* @param replacements A record of placeholders and their replacements.
* @returns The transmorphed string.
*/
export function getProcessedTags(
  input: string,
  replacements: Tags
): string {
  if (input != null) {
    for (const key in replacements) {
      input = input.replace(new RegExp(`{${key}}`, "g"), replacements[key]);
    }
  }
  return input;
}