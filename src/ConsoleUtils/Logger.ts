import { colorize, ForegroundColor } from "./Color.js";

/**
 * Logger class for logging messages with different colors based on log type.
 */
export class Logger {
  /**
   * Creates an instance of Logger.
   * @param {ForegroundColor | "null"} color - The foreground color for the log message.
   * @param {{ title: string; content: string }} data - The log data containing title and content.
   */
  constructor(
    color: ForegroundColor | "null",
    data: { title: string; content: string }
  ) {
    if (color === "null") {
      this.sendLog(data.title, data.content);
    } else {
      this.sendLog(
        colorize(`[${data.title}] ${data.content}`, color),
        ""
      );
    }
  }

  /**
   * Sends the log message to the console.
   * @param {string} title - The title of the log message.
   * @param {string} content - The content of the log message.
   */
  private sendLog(title: string, content: string) {
    console.log(`${title} ${content}`);
  }
}


