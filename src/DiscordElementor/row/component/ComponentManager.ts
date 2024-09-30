import {
  Row,
  Tags,
  getButtons,
  BuilderRegistry,
  Builder,
  getSelects,
  DiscordSelectTypes
} from "../..";
import { ActionRowBuilder, ButtonBuilder } from 'discord.js';

/**
 * Obtém todos os componentes de uma linha específica.
 * @param row Nome da linha de onde os componentes devem ser obtidos.
 * @param tags Tags de replacement de mensagens.
 * @returns Um array de objetos APIActionRowComponent configurados.
 * @throws Erros se a linha não for encontrada ou se não houver componentes.
 */
export function getComponents(row: string, tags: Tags): readonly (APIActionRowComponent<APIButtonComponent> | APIActionRowComponent<APISelectComponent>)[] {
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

  const rows: ActionRowBuilder<ButtonBuilder | DiscordSelectTypes>[] = [];

  // Adiciona componentes de botões
  const buttonComponents = getButtons(row, tags);
  if (buttonComponents.length > 0) {
    rows.push(new ActionRowBuilder<ButtonBuilder>().addComponents(buttonComponents));
  }

  // Adiciona componentes de seleção
  const selectComponents = getSelects(row, tags);
  if (selectComponents.length > 0) {
    rows.push(new ActionRowBuilder<DiscordSelectTypes>().addComponents(selectComponents));
  }

  // Retorna os componentes em formato JSON
  return rows.map(component => component.toJSON());
}
