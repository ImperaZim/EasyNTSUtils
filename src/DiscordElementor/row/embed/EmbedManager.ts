import { EmbedBuilder } from 'discord.js';
import { Row } from '../../RowInterface';
import { Tags, getProcessedTags } from '../../Text';
import { BuilderRegistry, Builder } from '../../index';
import { Embeds, EmbedData, EmbedField } from './EmbedInterface';

/**
 * Constrói um array de embeds com base nos dados fornecidos.
 * @param embedsData Dados dos embeds a serem construídos.
 * @param tags Tags de replacement de mensagens.
 * @returns Um array de objetos EmbedBuilder configurados.
 */
export function buildEmbeds(embedsData: Embeds, tags: Tags): EmbedBuilder[] {
  const embeds: EmbedBuilder[] = [];
  Object.keys(embedsData).forEach(key => {
    embeds.push(buildEmbed(embedsData[key], tags));
  });
  return embeds;
}

/**
 * Constrói um embed com base nos dados fornecidos.
 * @param embedData Dados do embed a ser construído.
 * @param tags Tags de replacement de mensagens.
 * @returns Um objeto EmbedBuilder configurado.
 */
export function buildEmbed(embedData: EmbedData, tags: Tags): EmbedBuilder {
  const embed = new EmbedBuilder();

  // Configurando a cor
  if (embedData.color) {
    embed.setColor(getProcessedTags(embedData.color, tags));
  }

  // Configurando o título
  if (embedData.title) {
    embed.setTitle(getProcessedTags(embedData.title, tags));
  }

  // Configurando a URL
  if (embedData.url) {
    embed.setURL(getProcessedTags(embedData.url, tags));
  }

  // Configurando o autor
  if (embedData.author) {
    embed.setAuthor({
      name: getProcessedTags(embedData.author.name, tags),
      iconURL: getProcessedTags(embedData.author.iconURL, tags)
    });
  }

  // Configurando a descrição
  if (embedData.description) {
    embed.setDescription(getProcessedTags(embedData.description, tags));
  }

  // Configurando a imagem em miniatura
  if (embedData.thumbnail) {
    embed.setThumbnail(getProcessedTags(embedData.thumbnail, tags));
  }

  // Configurando campos
  if (embedData.fields) {
    embedData.fields.forEach((field: EmbedField) => {
      embed.addFields({
        name: getProcessedTags(field.name, tags),
        value: getProcessedTags(field.value, tags)

      });
    });
  }

  // Configurando a imagem
  if (embedData.image) {
    embed.setImage(getProcessedTags(embedData.image, tags));
  }

  // Configurando o timestamp
  if (embedData.timestamp) {
    embed.setTimestamp();
  }

  // Configurando o rodapé
  if (embedData.footer) {
    embed.setFooter({
      text: getProcessedTags(embedData.footer.name, tags),
      iconURL: getProcessedTags(embedData.footer.iconURL, tags)
    });
  }

  return embed;
}

/**
 * Obtém um embed específico a partir de uma linha e nome do embed.
 * @param row Nome da linha onde o embed está localizado.
 * @param name Nome do embed a ser obtido.
 * @param tags Tags de replacement de mensagens.
 * @returns Um objeto EmbedBuilder configurado.
 * @throws Erros se a linha ou embed não forem encontrados.
 */
export function getEmbed(row: string, name: string, tags: Tags): EmbedBuilder {
  const builder: Builder = BuilderRegistry.builder;

  if (!builder.rows) {
    throw new Error('Lista de builders não encontrada!');
  }

  if (!builder.rows[row]) {
    throw new Error(`Lista ${row} não encontrada!`);
  }

  const rowData: { components?: { embeds?: Embeds } } = builder.rows[row];

  if (!rowData.components) {
    throw new Error(`Não foram encontrados componentes na lista ${row}!`);
  }

  const embeds: Embeds = rowData.components.embeds;

  if (!embeds) {
    throw new Error(`Não foram encontrados embeds nos componentes da lista ${row}!`);
  }

  if (!embeds[name]) {
    throw new Error(`O embed ${name} não existe nos componentes da lista ${row}!`);
  }

  const embedData: EmbedData = embeds[name];
  return buildEmbed(embedData, tags);
}

/**
 * Obtém todos os embeds de uma linha específica.
 * @param row Nome da linha de onde os embeds devem ser obtidos.
 * @param tags Tags de replacement de mensagens.
 * @returns Um array de objetos EmbedBuilder configurados.
 * @throws Erros se a linha não for encontrada ou se não houver embeds.
 */
export function getEmbeds(row: string, tags: Tags): EmbedBuilder[] {
  const builder: Builder = BuilderRegistry.builder;

  if (!builder.rows) {
    throw new Error('Lista de builders não encontrada!');
  }

  if (!builder.rows[row]) {
    throw new Error(`Lista ${row} não encontrada!`);
  }

  const rowData: Row = builder.rows[row];

  if (!rowData.embeds) {
    throw new Error(`Não foram encontrados embeds nos componentes da lista ${row}!`);
  }

  const embeds: Embeds = rowData.embeds;

  // Obter todos os embeds e construir o array de EmbedBuilder
  return buildEmbeds(embeds, tags);
}
