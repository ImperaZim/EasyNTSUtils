import {
  Row,
  Components,
  ButtonTypes, Buttons,
  Tags, getProcessedTags,
  BuilderRegistry, Builder
} from '../../..';
import { ButtonBuilder, ButtonStyle } from 'discord.js';

/**
 * Valida a existência de uma propriedade em um objeto.
 * @param obj O objeto a ser validado.
 * @param name O nome da propriedade a ser verificada.
 * @param errorMessage Mensagem de erro caso a propriedade não exista.
 */
function validateProperty<T>(obj: T | undefined, name: string, errorMessage: string): T {
  if (!obj) throw new Error(errorMessage);
  return obj;
}

/**
 * Constrói um único botão com base nos dados fornecidos.
 * @param buttonData Dados do botão a ser construído.
 * @param row Nome da linha a qual o botão pertence.
 * @param buttonName Nome do botão.
 * @param tags Tags de replacement de mensagens.
 * @returns Um objeto ButtonBuilder configurado.
 */
export function buildButton(buttonData: ButtonTypes, row: string, buttonName: string, tags: Tags): ButtonBuilder {
  const button = new ButtonBuilder();

  // Define o rótulo do botão, se fornecido
  const label = buttonData.data?.label;
  if (label) button.setLabel(getProcessedTags(label, tags));

  // Verifica o tipo do botão e configura as propriedades corretamente
  if (buttonData.type === ButtonStyle.Link) {
    button.setStyle(ButtonStyle.Link);
    const url = buttonData.data?.url;
    if (url) button.setURL(getProcessedTags(url, tags));
  } else {
    button.setStyle(buttonData.type);
    button.setCustomId(getProcessedTags(`${buttonName}`, tags));

    const emoji = buttonData.data?.emoji;
    if (emoji) button.setEmoji(getProcessedTags(emoji, tags));
  }

  return button;
}

/**
 * Constrói um array de botões com base nos dados fornecidos.
 * @param buttonsData Array de dados dos botões a serem construídos.
 * @param row Nome da linha a qual os botões pertencem.
 * @param tags Tags de replacement de mensagens.
 * @returns Um array de objetos ButtonBuilder configurados.
 */
export function buildButtons(buttonsData: Buttons, row: string, tags: Tags): ButtonBuilder[] {
  return Object.entries(buttonsData).map(([name, buttonData]) => 
    buildButton(buttonData, row, name, tags)
  );
}

/**
 * Obtém os dados de uma linha e valida sua existência.
 * @param row Nome da linha onde o botão está localizado.
 * @returns Dados da linha.
 * @throws Erro se a linha ou componentes não forem encontrados.
 */
function getRowData(row: string): Components {
  const builder = validateProperty(BuilderRegistry.builder, 'builder', 'Lista de builders não encontrada!');
  const rowData = validateProperty(builder.rows?.[row], 'rows', `Lista ${row} não encontrada!`);
  return validateProperty(rowData.components, 'components', `Não foram encontrados componentes na lista ${row}!`);
}

/**
 * Obtém um botão específico a partir de uma linha e nome do botão.
 * @param row Nome da linha onde o botão está localizado.
 * @param name Nome do botão a ser obtido.
 * @param tags Tags de replacement de mensagens.
 * @returns Um objeto ButtonBuilder configurado.
 * @throws Erro se o botão não for encontrado.
 */
export function getButton(row: string, name: string, tags: Tags): ButtonBuilder {
  const components = getRowData(row);
  const buttonData = validateProperty(components.buttons?.[name], 'buttons', `O botão ${name} não existe nos componentes da lista ${row}!`);
  return buildButton(buttonData, row, name, tags);
}

/**
 * Obtém todos os botões de uma linha específica.
 * @param row Nome da linha de onde os botões devem ser obtidos.
 * @param tags Tags de replacement de mensagens.
 * @returns Um array de objetos ButtonBuilder configurados.
 * @throws Erro se não houver botões.
 */
export function getButtons(row: string, tags: Tags): ButtonBuilder[] {
  const components = getRowData(row);
  const buttonsData = validateProperty(components.buttons, 'buttons', `Não foram encontrados botões nos componentes da lista ${row}!`);
  return buildButtons(buttonsData, row, tags);
}
