import {
  ChannelType,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  RoleSelectMenuBuilder
} from 'discord.js';

interface onSubmit {
  elementType: "row" | "modal",
  elementIdentifier: string,
}

/**
 * Interface para os dados do select de string.
 * Um select que permite ao usuário escolher entre várias opções de texto.
 */
export interface SelectStringDataOption {
  /** Texto exibido na opção */
  label: string;
  /** Descrição da opção */
  description: string;
  /** Valor associado à opção */
  value: string;
}

/**
 * Interface para os dados do select de string.
 * Um select que permite ao usuário escolher entre várias opções de texto.
 */
export interface SelectStringData {
  /** Se o select está desabilitado ou não */
  disabled?: boolean;
  /** Texto exibido como placeholder no select */
  placeholder?: string;
  /** Opções disponíveis no select */
  options: SelectStringDataOption[];
  onSubmit?: onSubmit;
}

/**
 * Interface para o select de string.
 * Um select que permite ao usuário escolher entre várias opções de texto.
 */
export interface SelectString {
  /** Tipo do select: string */
  type: "string";
  data: SelectStringData; // Usando a interface de dados específica
}

/**
 * Interface para os dados do select de usuário.
 * Um select que permite ao usuário escolher um ou mais usuários.
 */
export interface SelectUserData {
  /** Se o select está desabilitado ou não */
  disabled?: boolean;
  /** Texto exibido como placeholder no select */
  placeholder?: string;
  /** Valor mínimo de seleções */
  minValue?: number;
  /** Valor máximo de seleções */
  maxValue?: number;
  onSubmit?: onSubmit;
}

/**
 * Interface para o select de usuário.
 * Um select que permite ao usuário escolher um ou mais usuários.
 */
export interface SelectUser {
  /** Tipo do select: user */
  type: "user";
  data: SelectUserData; // Usando a interface de dados específica
}

/**
 * Interface para os dados do select de canal.
 * Um select que permite ao usuário escolher entre canais específicos.
 */
export interface SelectChannelData {
  /** Se o select está desabilitado ou não */
  disabled?: boolean;
  /** Texto exibido como placeholder no select */
  placeholder?: string;
  /** Valor mínimo de seleções */
  minValue?: number;
  /** Valor máximo de seleções */
  maxValue?: number;
  /** Tipos de canal permitidos */
  channelTypes: ChannelType[];
  onSubmit?: onSubmit;
}

/**
 * Interface para o select de canal.
 * Um select que permite ao usuário escolher entre canais específicos.
 */
export interface SelectChannel {
  /** Tipo do select: channel */
  type: "channel";
  data: SelectChannelData; // Usando a interface de dados específica
}

/**
 * Interface para os dados do select de cargo (role).
 * Um select que permite ao usuário escolher um ou mais cargos.
 */
export interface SelectRoleData {
  /** Se o select está desabilitado ou não */
  disabled?: boolean;
  /** Texto exibido como placeholder no select */
  placeholder?: string;
  /** Valor mínimo de seleções */
  minValue?: number;
  /** Valor máximo de seleções */
  maxValue?: number;
  onSubmit?: onSubmit;
}

/**
 * Interface para o select de cargo (role).
 * Um select que permite ao usuário escolher um ou mais cargos.
 */
export interface SelectRole {
  /** Tipo do select: role */
  type: "role";
  data: SelectRoleData; // Usando a interface de dados específica
}

/**
 * Tipo que abrange todos os tipos de selects do discord.
 * Isso inclui selects de string, usuário, canal e cargo.
 */
export type DiscordSelectTypes =
  | StringSelectMenuBuilder
  | UserSelectMenuBuilder
  | ChannelSelectMenuBuilder
  | RoleSelectMenuBuilder;

/**
 * Tipo que abrange todos os tipos de selects.
 * Isso inclui selects de string, usuário, canal e cargo.
 */
export type SelectTypes =
  | SelectString
  | SelectUser
  | SelectChannel
  | SelectRole;

/**
 * Interface para um conjunto dinâmico de selects.
 * Cada chave representa um select, que pode ser de qualquer um dos tipos definidos em `SelectTypes`.
 */
export interface Selects {
  [key: string]: SelectTypes;
}
