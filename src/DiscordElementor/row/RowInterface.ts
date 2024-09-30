import { Embeds } from './embed/EmbedInterface'; // Importando a interface de Embeds
import { Components } from './component/ComponentInterface'; // Importando a interface de components
import { EmbedBuilder, ActionRowBuilder } from "discord.js";

/**
 * Interface para uma única linha que contém embeds e componentes.
 */
export interface Row {
  /** Um objeto que contém embeds. */
  embeds?: Embeds;
  /** Um objeto que contém componentes. */
  components?: Components;
}
/**
 * Interface para uma única linha que contém embeds e componentes do discord.
 */
export interface DiscordRows {
  /** Um objeto que contém embeds. */
  embeds?: EmbedBuilder[];
  /** Um objeto que contém componentes. */
  components?: ActionRowBuilder[];
}

/**
 * Interface para um conjunto de linhas, onde cada chave é o nome da linha e o valor é um Row.
 */
export interface Rows {
  [key: string]: Row; // Cada linha é identificada por uma chave do tipo string
}