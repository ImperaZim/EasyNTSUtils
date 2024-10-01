import { black, red, green, yellow, blue, magenta, cyan, white, gray, whiteBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright } from 'colorette';

/**
 * Represents the available foreground colors.
 */
export type ForegroundColor =
  | 'black'
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'whiteBright'
  | 'blackBright'
  | 'redBright'
  | 'greenBright'
  | 'yellowBright'
  | 'blueBright'
  | 'magentaBright'
  | 'cyanBright';

/**
 * A mapping of foreground colors to their corresponding colorette functions.
 */
export const colors: Record<ForegroundColor, (text: string) => string> = {
  black: black,
  red: red,
  green: green,
  yellow: yellow,
  blue: blue,
  magenta: magenta,
  cyan: cyan,
  white: white,
  gray: gray,
  whiteBright: whiteBright,
  blackBright: black,
  redBright: redBright,
  greenBright: greenBright,
  yellowBright: yellowBright,
  blueBright: blueBright,
  magentaBright: magentaBright,
  cyanBright: cyanBright,
};

/**
 * Colorizes the given text using the specified foreground color.
 * @param {string} text - The text to be colorized.
 * @param {ForegroundColor} color - The color to use for colorization.
 * @returns {string} - The colorized text.
 */
export function colorize(text: string, color: ForegroundColor): string {
  return colors[color](text);
}
