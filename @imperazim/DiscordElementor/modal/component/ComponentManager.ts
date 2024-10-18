import {
  Tags,
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
export function getModalComponents(modal: string, tags: Tags): ActionRowBuilder<TextInputBuilder>[] {
  const builder: Builder = BuilderRegistry.builder;

  if (!builder.modals) {
    throw new Error('Lista de builders não encontrada!');
  }

  if (!builder.modals[modal]) {
    throw new Error(`Modal ${modal} não encontrada!`);
  }

  const inputs = getInputs(modal, tags);
  if (inputs.length > 5) {
    throw new Error('O modal não pode ter mais de 5 inputs.');
  }

  const actionRows: ActionRowBuilder<TextInputBuilder>[] = [];
  
  getInputs(modal, tags).forEach(element => {
    
  });
  
  if (builder.modals[modal].inputs) {
    for (const input of getInputs(modal, tags)) {
      console.log(input);
      actionRows.push(new ActionRowBuilder<TextInputBuilder>().addComponents(input));
    }
  }

  return actionRows;
}
