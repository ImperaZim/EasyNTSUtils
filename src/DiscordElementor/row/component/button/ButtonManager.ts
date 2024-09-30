import { ButtonBuilder, ButtonStyle } from 'discord.js';
import { Row } from '../../RowInterface';
import { Components } from '../ComponentInterface';
import { ButtonTypes, Buttons } from './ButtonInterface';
import { BuilderRegistry, Builder } from '../../../index';
import { Tags, getProcessedTags } from '../../../Text';

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
  if (buttonData.data.label) {
    button.setLabel(getProcessedTags(buttonData.data.label, tags));
  }

  // Verifica o tipo do botão e configura as propriedades corretamente
  switch (buttonData.type) {
    case ButtonStyle.Link:
      button.setStyle(ButtonStyle.Link);
      if (buttonData.data.url) {
        button.setURL(getProcessedTags(buttonData.data.url, tags));
      }
      break;

    case ButtonStyle.Primary:
    case ButtonStyle.Secondary:
    case ButtonStyle.Success:
    case ButtonStyle.Danger:
      button.setStyle(buttonData.type);

      // Gera o customId usando o formato `row.buttonName`
      const customId = `${row}.${buttonName}`;
      button.setCustomId(getProcessedTags(customId, tags));

      if (buttonData.data.emoji) {
        button.setEmoji(getProcessedTags(buttonData.data.emoji, tags));
      }
      break;

    default:
      throw new Error('Tipo de botão desconhecido');
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
export function buildButtons(buttonsData: Buttons[], row: string, tags: Tags): ButtonBuilder[] {
  const buttons: ButtonBuilder[] = [];
  for (const buttonName in Object.keys(buttonsData)) {
    buttons.push(buildButton(buttonsData[buttonName], row, buttonName, tags));
  }
  return buttons;
}

/**
 * Obtém um botão específico a partir de uma linha e nome do botão.
 * @param row Nome da linha onde o botão está localizado.
 * @param name Nome do botão a ser obtido.
 * @param tags Tags de replacement de mensagens.
 * @returns Um objeto ButtonBuilder configurado.
 * @throws Erros se a linha ou botão não forem encontrados.
 */
export function getButton(row: string, name: string, tags: Tags): ButtonBuilder {
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

  const componentsData: Components = rowData.components;

  if (!componentsData.buttons) {
    throw new Error(`Não foram encontrados botões nos componentes da lista ${row}!`);
  }

  if (!componentsData.buttons[name]) {
    throw new Error(`O botão ${name} não existe nos componentes da lista ${row}!`);
  }

  const buttonData: ButtonTypes = componentsData.buttons[name];
  return buildButton(buttonData, row, name, tags);
}

/**
 * Obtém todos os botões de uma linha específica.
 * @param row Nome da linha de onde os botões devem ser obtidos.
 * @param tags Tags de replacement de mensagens.
 * @returns Um array de objetos ButtonBuilder configurados.
 * @throws Erros se a linha não for encontrada ou se não houver botões.
 */
export function getButtons(row: string, tags: Tags): ButtonBuilder[] {
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

  const componentsData: Components = rowData.components;

  if (!componentsData.buttons) {
    throw new Error(`Não foram encontrados botões nos componentes da lista ${row}!`);
  }

  // Obter todos os botões e construir o array de ButtonBuilder
  return Object.keys(componentsData.buttons).map((name) => {
    const buttonData: ButtonTypes = componentsData.buttons[name];
    return buildButton(buttonData, row, name, tags);
  });
}
