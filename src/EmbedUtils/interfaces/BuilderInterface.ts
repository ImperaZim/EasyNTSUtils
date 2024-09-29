import { ButtonBuilder, ButtonStyle, SelectMenuBuilder, TextInputBuilder } from "discord.js";

/**
 * Represents a field within an embed.
 */
export interface EmbedField {
  name?: string;
  value?: string;
}

/**
 * Represents the footer of an embed.
 */
export interface EmbedFooter {
  text?: string;
  iconURL?: string;
}

/**
 * Represents the author of an embed.
 */
export interface EmbedAuthor {
  name?: string;
  iconURL?: string;
}

/**
 * Represents a Discord embed object with optional fields for
 * title, image, description, etc.
 */
export interface Embed {
  title?: string;
  image?: string;
  thumbnail?: string;
  description?: string;
  fields?: EmbedField[];
  footer?: EmbedFooter;
  author?: EmbedAuthor;
}

/**
 * Extends ButtonBuilder to define custom button component.
 */
export interface ButtonComponent extends ButtonBuilder {
  customId: string;
}

/**
 * Extends SelectMenuBuilder to define a select component with options.
 */
export interface SelectComponent extends SelectMenuBuilder {
  customId: string;
}

/**
 * Union type representing all possible component types.
 */
export type Component = ButtonComponent | SelectComponent;

/**
 * Represents an action row with embeds and components.
 */
export interface ActionRows {
  embeds?: Embed[];
  components?: Component[];
}

/**
 * Represents the main builder data structure.
 */
export interface BuilderData {
  [key: string]: ActionRows;
}

/**
 * Represents a dictionary of tags.
 */
export type Tags = Record<string, string>;
