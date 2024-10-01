import { TextInputStyle } from "discord.js";

export interface Input {
  label: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  value?: string;
  required?: boolean;
  style: TextInputStyle;
}

/**
 * Interface para um conjunto dinâmico de botões.
 * Cada chave representa um input, representado em Input.
 */
export interface Inputs {
  [key: string]: Input;
}