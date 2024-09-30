import {
  Tags,
  Rows, Row,
  getEmbeds, getComponents,
  BuilderRegistry, Builder,
} from "../";

/**
 * Obtém todos os ActionRows de uma linha específica.
 * @param row Nome da linha de onde os ActionRows devem ser obtidser
 * @param tags Tags de replacement de mensagens.
 * @returns Um array de objetos DiscordRows configurados.
 * @throws Erros se a linha não for encontrada ou se não houver ActionRows.
 */
export function getRow(row: string, tags: Tags) {
  const builder: Builder = BuilderRegistry.builder;

  if (!builder.rows) {
    throw new Error('Lista de builders não encontrada!');
  }

  if (!builder.rows[row]) {
    throw new Error(`Linha ${row} não encontrada!`);
  }

  return {
    embeds: getEmbeds(row, tags),
    components: getComponents(row, tags).map(component => component.toJSON())
  }

}

export function registerRow(name: string, row: Row): Rows {
  // Verifica se a propriedade 'rows' já está inicializada. Se não, inicializa como um objeto vazio.
  if (!BuilderRegistry.builder.rows) {
    BuilderRegistry.builder.rows = {};
  }
  
  if (BuilderRegistry.builder.rows[name]) {
    throw new Error(`Já existe um linha com o nome ${name} salvo!`);
  }

  // Atualiza ou adiciona o 'row' com a chave 'name' ao objeto 'rows'
  BuilderRegistry.builder.rows[name] = row;

  // Retorna o objeto 'rows' atualizado
  return BuilderRegistry.builder.rows;
}