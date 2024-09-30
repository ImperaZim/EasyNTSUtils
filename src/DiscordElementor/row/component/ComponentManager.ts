import {
  Row,
  Tags,
  getButtons,
  BuilderRegistry, Builder,
  getSelects, DiscordSelectTypes
} from "../..";
import { ActionRowBuilder, ButtonBuilder } from 'discord.js';

/**
 * Obtém todos os componentes de uma linha específica.
 * @param row Nome da linha de onde os componentes devem ser obtidos.
 * @param tags Tags de replacement de mensagens.
 * @returns Um array de objetos ActionRowBuilder configurados.
 * @throws Erros se a linha não for encontrada ou se não houver componentes.
 */
export function getComponents(row: string, tags: Tags): ActionRowBuilder[] {
  const builder: Builder = BuilderRegistry.builder;

  if (!builder.rows) {
    throw new Error('Lista de builders não encontrada!');
  }

  if (!builder.rows[row]) {
    throw new Error(`Lista ${row} não encontrada!`);
  }

  const rowData: Row = builder.rows[row];

  if (!rowData.components) {
    throw new Error(`Não foram encontrados componentes na lista ${row}!`);
  }

  const rows: ActionRowBuilder[] = [];
  rows.push(new ActionRowBuilder<ButtonBuilder>().addComponents(getButtons(row, tags)));
  rows.push(new ActionRowBuilder<DiscordSelectTypes>().addComponents(getSelects(row, tags)));

  return rows; // Retorna todos os ActionRowBuilder configurados
}
