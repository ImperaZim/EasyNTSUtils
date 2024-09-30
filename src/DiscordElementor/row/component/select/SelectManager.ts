import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  UserSelectMenuBuilder,
  ChannelSelectMenuBuilder,
  RoleSelectMenuBuilder
} from 'discord.js';
import {
  Row,
  Components,
  Selects, SelectTypes,
  Tags, getProcessedTags,
  BuilderRegistry, Builder,
  SelectUserData, SelectChannelData,
  SelectRoleData, DiscordSelectTypes,
  SelectStringData, SelectStringDataOption,
} from '../../..';

/**
 * Constrói um único select com base nos dados fornecidos.
 * @param selectData Dados do select a ser construído.
 * @param tags Tags de replacement de mensagens.
 * @param row Nome da linha.
 * @param name Nome do select.
 * @returns Um objeto DiscordSelectTypes configurado.
 */
export function buildSelect(selectData: SelectTypes, tags: Tags, row: string, name: string): DiscordSelectTypes {
  const customId = `${row}.${name}`;

  // Verifica o tipo do select e configura as opções corretamente
  switch (selectData.type) {
    case 'string':
      let stringSelect = new StringSelectMenuBuilder();
      if (selectData.data) {
        const data: SelectStringData = selectData.data;

        // Definindo propriedades do select
        if (data.disabled) stringSelect.setDisabled(data.disabled);
        stringSelect.setCustomId(getProcessedTags(customId, tags));
        if (data.placeholder) stringSelect.setPlaceholder(getProcessedTags(data.placeholder, tags));

        // Verificando e adicionando opções
        if (data.options) {
          const options: SelectStringDataOption[] = data.options;
          stringSelect.addOptions(
            options.map((optionData) => {
              const option = new StringSelectMenuOptionBuilder();
              if (optionData.label) option.setLabel(getProcessedTags(optionData.label, tags));
              if (optionData.description) option.setDescription(getProcessedTags(optionData.description, tags));
              if (optionData.value) option.setValue(getProcessedTags(optionData.value, tags));
              return option;
            })
          );
        }
      }
      return stringSelect;

    case 'user':
      let userSelect = new UserSelectMenuBuilder();
      if (selectData.data) {
        const data: SelectUserData = selectData.data;

        if (data.disabled) userSelect.setDisabled(data.disabled);
        userSelect.setCustomId(getProcessedTags(customId, tags));
        if (data.placeholder) userSelect.setPlaceholder(getProcessedTags(data.placeholder, tags));
        if (data.minValue) userSelect.setMinValues(data.minValue);
        if (data.maxValue) userSelect.setMaxValues(data.maxValue);
      }
      return userSelect;

    case 'channel':
      let channelSelect = new ChannelSelectMenuBuilder();
      if (selectData.data) {
        const data: SelectChannelData = selectData.data;

        if (data.disabled) channelSelect.setDisabled(data.disabled);
        channelSelect.setCustomId(getProcessedTags(customId, tags));
        if (data.placeholder) channelSelect.setPlaceholder(getProcessedTags(data.placeholder, tags));
        if (data.minValue) channelSelect.setMinValues(data.minValue);
        if (data.maxValue) channelSelect.setMaxValues(data.maxValue);
        if (data.channelTypes) channelSelect.setChannelTypes(data.channelTypes);
      }
      return channelSelect;

    case 'role':
      var roleSelect = new RoleSelectMenuBuilder();
      if (selectData.data) {
        const data: SelectRoleData = selectData.data;

        if (data.disabled) roleSelect.setDisabled(data.disabled);
        roleSelect.setCustomId(getProcessedTags(customId, tags));
        if (data.placeholder) roleSelect.setPlaceholder(getProcessedTags(data.placeholder, tags));
        if (data.minValue) roleSelect.setMinValues(data.minValue);
        if (data.maxValue) roleSelect.setMaxValues(data.maxValue);
      }
      return roleSelect;

    default:
      throw new Error('Tipo de select desconhecido');
  }
}

/**
 * Constrói um array de selects com base nos dados fornecidos.
 * @param selectsData Array de dados dos selects a serem construídos.
 * @param tags Tags de replacement de mensagens.
 * @param row Nome da linha.
 * @returns Um array de objetos DiscordSelectTypes configurados.
 */
export function buildSelects(selectsData: Selects, tags: Tags, row: string): DiscordSelectTypes[] {
  return Object.keys(selectsData).map((name) => {
    const selectData: SelectTypes = selectsData[name];
    return buildSelect(selectData, row, name, tags);
  });
}

/**
 * Obtém um select específico a partir de uma linha e nome do select.
 * @param row Nome da linha onde o select está localizado.
 * @param name Nome do select a ser obtido.
 * @param tags Tags de replacement de mensagens.
 * @returns Um objeto DiscordSelectTypes configurado.
 * @throws Erros se a linha ou select não forem encontrados.
 */
export function getSelect(row: string, name: string, tags: Tags): DiscordSelectTypes {
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

  if (!componentsData.selects) {
    throw new Error(`Não foram encontrados selects nos componentes da lista ${row}!`);
  }

  if (!componentsData.selects[name]) {
    throw new Error(`O select ${name} não existe nos componentes da lista ${row}!`);
  }

  const selectData: SelectTypes = componentsData.selects[name];
  return buildSelect(selectData, tags, row, name);
}

/**
 * Obtém todos os selects de uma linha específica.
 * @param row Nome da linha de onde os selects devem ser obtidos.
 * @param tags Tags de replacement de mensagens.
 * @returns Um array de objetos DiscordSelectTypes configurados.
 * @throws Erros se a linha não for encontrada ou se não houver selects.
 */
export function getSelects(row: string, tags: Tags): DiscordSelectTypes[] {
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

  if (!componentsData.selects) {
    throw new Error(`Não foram encontrados selects nos componentes da lista ${row}!`);
  }
  
  const selectsData: Selects = componentsData.selects;
  
  return Object.keys(selectsData).map((name) => {
    const selectData: SelectTypes = selectsData[name];
    return buildSelect(selectData, tags, row, name);
  });
}
