import { ForegroundColor } from "./Color";

/**
 * Represents the available log types.
 */
export type LogType = "info" | "notice" | "error" | "alert" | "null";

/**
 * A mapping of log types to their corresponding foreground colors.
 */
export const types: Record<LogType, ForegroundColor> = {
  info: "magenta",
  notice: "blue",
  error: "red",
  alert: "yellow",
  null: "white"
};