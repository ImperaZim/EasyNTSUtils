import {
  Tags,
  Modal,
  getInputs,
  BuilderRegistry,
  Builder,
} from '../../../';
import { ActionRowBuilder, TextInputBuilder } from 'discord.js';

/**
 * Obtém todos os componentes de um modal específico.
 * 
 * @param modal - Nome do modal de onde os componentes devem ser obtidos.
 * @param tags - Tags de substituição para processamento de mensagens.
 * @returns Um array de objetos ActionRowBuilder configurados com campos de entrada.
 * @throws Erros se o modal não for encontrado ou se não houver componentes.
 */
export function getModalComponents(modal: string, tags: Tags): ActionRowBuilder[] {
  const builder: Builder = BuilderRegistry.builder;

  if (!builder.modals) {
    throw new Error('Lista de builders não encontrada!');
  }

  if (!builder.modals[modal]) {
    throw new Error(`Modal ${modal} não encontrada!`);
  }

  const actionRows: ActionRowBuilder[] = [];

  // Obter inputs e adicionar a um ActionRowBuilder
  const inputs = getInputs(modal, tags);
  if (inputs.length > 0) {
    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(...inputs);
    actionRows.push(actionRow);
  }

  return actionRows; // Retorna todos os ActionRowBuilder configurados com inputs
}
