import { colorize } from "./Color.js";
/**
 * Logger class for logging messages with different colors based on log type.
 */
export class Logger {
    /**
     * Creates an instance of Logger.
     * @param {ForegroundColor | "null"} color - The foreground color for the log message.
     * @param {{ title: string; content: string }} data - The log data containing title and content.
     */
    constructor(color, data) {
        if (color === "null") {
            this.sendLog(data.title, data.content);
        }
        else {
            this.sendLog(colorize(`[${data.title}] ${data.content}`, color), "");
        }
    }
    /**
     * Sends the log message to the console.
     * @param {string} title - The title of the log message.
     * @param {string} content - The content of the log message.
     */
    sendLog(title, content) {
        console.log(`${title} ${content}`);
    }
}
