import { ButtonStyle } from 'discord.js';

export interface onInterfaction {
  elementType: "row" | "modal",
  elementIdentifier: string,
}

/**
 * Interface para o botão de link.
 * Um botão do estilo Link que redireciona o usuário para uma URL externa.
 */
export interface ButtonLink {
  /** Estilo do botão: Link */
  type: ButtonStyle.Link;
  data: {
    /** Texto exibido no botão */
    label: string;
    /** URL para a qual o botão redireciona */
    url: string;
  };
}

/**
 * Interface para o botão de ação primária.
 * Botão interativo.
 */
export interface ButtonPrimary {
  /** Estilo do botão: Primary */
  type: ButtonStyle.Primary;
  data: {
    /** Texto exibido no botão */
    label: string;
    /** Emoji opcional exibido no botão */
    emoji?: string;
    onInterfaction?: onInterfaction;
  };
}

/**
 * Interface para o botão de ação secundária.
 * Botão interativo semelhante ao primário, mas com um estilo secundário.
 */
export interface ButtonSecondary {
  /** Estilo do botão: Secondary */
  type: ButtonStyle.Secondary;
  data: {
    /** Texto exibido no botão */
    label: string;
    /** Emoji opcional exibido no botão */
    emoji?: string;
    onInterfaction?: onInterfaction;
  };
}

/**
 * Interface para o botão de ação de sucesso.
 * Botão interativo que indica uma ação positiva, como "Confirmar" ou "Aceitar".
 */
export interface ButtonSuccess {
  /** Estilo do botão: Success */
  type: ButtonStyle.Success;
  data: {
    /** Texto exibido no botão */
    label: string;
    /** Emoji opcional exibido no botão */
    emoji?: string;
    onInterfaction?: onInterfaction;
  };
}

/**
 * Interface para o botão de ação de perigo.
 * Botão interativo que indica uma ação destrutiva ou perigosa, como "Excluir".
 */
export interface ButtonDanger {
  /** Estilo do botão: Danger */
  type: ButtonStyle.Danger;
  data: {
    /** Texto exibido no botão */
    label: string;
    /** Emoji opcional exibido no botão */
    emoji?: string;
    onInterfaction?: onInterfaction;
  };
}

/**
 * Tipo que abrange todos os tipos de botões.
 * Isso inclui botões de Link, Primário, Secundário, Sucesso e Perigo.
 */
export type ButtonTypes =
  | ButtonLink
  | ButtonPrimary
  | ButtonSecondary
  | ButtonSuccess
  | ButtonDanger;

/**
 * Interface para um conjunto dinâmico de botões.
 * Cada chave representa um botão, que pode ser de qualquer um dos tipos definidos em `ButtonTypes`.
 */
export interface Buttons {
  [key: string]: ButtonTypes;
}
