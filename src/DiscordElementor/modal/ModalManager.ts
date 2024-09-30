import {
  Tags,
  Modal,
  getModalComponents,
  BuilderRegistry, Builder
} from "../../";
import { ModalBuilder, ActionRowBuilder } from 'discord.js';

/**
 * Obtém todos os dados de um modal específico e retorna um ModalBuilder.
 * 
 * @param modal - Nome do modal de onde os dados devem ser obtidos.
 * @param tags - Tags de substituição para processamento de mensagens.
 * @returns Um objeto ModalBuilder configurado.
 * @throws Erros se o modal não for encontrado ou se não houver dados.
 */
export function getModal(modal: string, tags: Tags): ModalBuilder {
  const builder: Builder = BuilderRegistry.builder;

  if (!builder.modals) {
    throw new Error('Lista de builders não encontrada!');
  }

  if (!builder.modals[modal]) {
    throw new Error(`Modal ${modal} não encontrada!`);
  }

  const modalData: Modal = builder.modals[modal];
  const components: ActionRowBuilder[] = getModalComponents(modal, tags);

  const modalBuilder = new ModalBuilder();
  modalBuilder.setCustomId(modal);
  modalData.title && modalBuilder.setTitle(modalData.title);
  modalData.components && modalBuilder.addComponents(...components);

  return modalBuilder;
}

/**
 * Registra um novo modal.
 * 
 * @param name - Nome do modal a ser registrado.
 * @param modal - Dados do modal a ser registrado.
 * @returns O objeto 'modals' atualizado.
 * @throws Erros se um modal com o mesmo nome já existir.
 */
export function registerModal(name: string, modal: Modal): Modals {
  // Verifica se a propriedade 'modals' já está inicializada. Se não, inicializa como um objeto vazio.
  if (!BuilderRegistry.builder.modals) {
    BuilderRegistry.builder.modals = {};
  }

  if (BuilderRegistry.builder.modals[name]) {
    throw new Error(`Já existe um modal com o nome ${name} salvo!`);
  }

  // Atualiza ou adiciona o 'modal' com a chave 'name' ao objeto 'modals'
  BuilderRegistry.builder.modals[name] = modal;

  // Retorna o objeto 'modals' atualizado
  return BuilderRegistry.builder.modals;
}
