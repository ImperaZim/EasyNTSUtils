import { ButtonBuilder, ButtonStyle, SelectMenuBuilder, ModalBuilder, TextInputBuilder } from "discord.js";

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
 * Represents a text input within a modal component.
 * This uses TextInputBuilder from discord.js.
 */
export interface TextInputComponent extends TextInputBuilder {
  customId: string;
}

/**
 * Extends ModalBuilder to define a modal component.
 */
export interface ModalComponent extends ModalBuilder {
  customId: string;
  components: TextInputComponent[]; // A modal contains text inputs.
}

/**
 * Union type representing all possible component types.
 */
export type Component = ButtonComponent | SelectComponent | ModalComponent;

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
