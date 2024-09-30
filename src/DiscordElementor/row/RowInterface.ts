import { Embeds, Components } from "../";
import { EmbedBuilder, ActionRowBuilder } from "discord.js";
import { APIActionRowComponent, APIButtonComponent, APISelectComponent } from 'discord-api-types/v10'; // Certifique-se de que a versão está correta

/**
 * Interface para uma única linha que contém embeds e componentes.
 */
export interface Row {
  /** Um objeto que contém embeds. */
  embeds?: Embeds;
  /** Um objeto que contém componentes, agora ajustado para o tipo correto. */
  components?: readonly (APIActionRowComponent<APIButtonComponent> | APIActionRowComponent<APISelectComponent>)[];
}

/**
 * Interface para uma única linha que contém embeds e componentes do discord.
 */
export interface DiscordRows {
  /** Um objeto que contém embeds. */
  embeds?: EmbedBuilder[];
  /** Um objeto que contém componentes, agora ajustado para o tipo correto. */
  components?: readonly (APIActionRowComponent<APIButtonComponent> | APIActionRowComponent<APISelectComponent>)[];
}

/**
 * Interface para um conjunto de linhas, onde cada chave é o nome da linha e o valor é um Row.
 */
export interface Rows {
  [key: string]: Row; // Cada linha é identificada por uma chave do tipo string
}
