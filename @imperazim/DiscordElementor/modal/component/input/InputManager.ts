import {
  Tags, getProcessedTags,
  Modal, ModalComponents, Input, Inputs,
  BuilderRegistry, Builder,
} from '../../../';
import { TextInputBuilder } from "discord.js";

/**
 * Constrói um único campo de entrada com base nos dados fornecidos.
 * @param inputData - Dados do campo de entrada a ser construído.
 * @param modal - Nome do modal ao qual o campo de entrada pertence.
 * @param inputName - Nome do campo de entrada.
 * @param tags - Tags de substituição para processamento de mensagens.
 * @returns Um objeto TextInputBuilder configurado.
 * @throws Error se os dados do campo de entrada estiverem ausentes ou inválidos.
 */
export function buildInput(inputData: Input, modal: string, inputName: string, tags: Tags): TextInputBuilder {
  const input = new TextInputBuilder();

  input.setCustomId(getProcessedTags(`${modal}.${inputName}`, tags));
  inputData.style && input.setStyle(inputData.style);
  inputData.required && input.setRequired(inputData.required);
  inputData.minLength && input.setMinLength(inputData.minLength);
  inputData.maxLength && input.setMaxLength(inputData.maxLength);
  inputData.label && input.setLabel(getProcessedTags(inputData.label, tags));
  inputData.placeholder && input.setPlaceholder(getProcessedTags(inputData.placeholder, tags));

  return input;
}

/**
 * Constrói um array de campos de entrada com base nos dados fornecidos.
 * @param inputsData - Array de dados dos campos de entrada a serem construídos.
 * @param modal - Nome do modal ao qual os campos de entrada pertencem.
 * @param tags - Tags de substituição para processamento de mensagens.
 * @returns Um array de objetos TextInputBuilder configurados.
 * @throws Error se os dados dos campos de entrada estiverem ausentes ou inválidos.
 */
export function buildInputs(inputsData: Input[], modal: string, tags: Tags): TextInputBuilder[] {
  const inputs: TextInputBuilder[] = [];

  for (const inputName in inputsData) {
    inputs.push(buildInput(inputsData[inputName], modal, inputName, tags));
  }

  return inputs;
}

/**
 * Obtém um campo de entrada específico de um modal registrado.
 * @param modal - Nome do modal de onde o campo de entrada será obtido.
 * @param name - Nome do campo de entrada.
 * @param tags - Tags de substituição para processamento de mensagens.
 * @returns Um objeto TextInputBuilder configurado para o campo de entrada solicitado.
 * @throws Error se o modal não for encontrado, se não houver componentes ou se o campo de entrada não existir.
 */
export function getInput(modal: string, name: string, tags: Tags): TextInputBuilder {
  const builder: Builder = BuilderRegistry.builder;

  if (!builder.modals) {
    throw new Error('Lista de builders não encontrada!');
  }

  if (!builder.modals[modal]) {
    throw new Error(`Modal ${modal} não encontrada!`);
  }

  const modalData: Modal = builder.modals[modal];

  if (!modalData.components) {
    throw new Error(`Não foram encontrados componentes na modal ${modal}!`);
  }

  const componentsData: ModalComponents = modalData.components;

  if (!componentsData.inputs) {
    throw new Error(`Não foram encontrados inputs nos componentes da modal ${modal}!`);
  }

  const inputData: Input | undefined = componentsData.inputs[name];

  if (!inputData) {
    throw new Error(`O Input ${name} não existe nos componentes da modal ${modal}!`);
  }

  return buildInput(inputData, modal, name, tags);
}

/**
 * Obtém todos os campos de entrada de um modal registrado.
 * @param modal - Nome do modal de onde os campos de entrada serão obtidos.
 * @param tags - Tags de substituição para processamento de mensagens.
 * @returns Um array de objetos TextInputBuilder configurados para os campos de entrada do modal.
 * @throws Error se o modal não for encontrado, se não houver componentes ou se não houver inputs.
 */
export function getInputs(modal: string, tags: Tags): TextInputBuilder[] {
  const builder: Builder = BuilderRegistry.builder;

  if (!builder.modals) {
    throw new Error('Lista de builders não encontrada!');
  }

  if (!builder.modals[modal]) {
    throw new Error(`Modal ${modal} não encontrada!`);
  }

  const modalData: Modal = builder.modals[modal];

  if (!modalData.components) {
    throw new Error(`Não foram encontrados componentes na modal ${modal}!`);
  }

  const componentsData: ModalComponents = modalData.components;

  if (!componentsData.inputs) {
    throw new Error(`Não foram encontrados inputs nos componentes da modal ${modal}!`);
  }

  const inputsData: Inputs = componentsData.inputs;

  // Obter todos os campos de entrada e construir o array de TextInputBuilder
  return Object.keys(inputsData).map((name) => {
    if (!inputsData[name]) {
      throw new Error(`Não existe nenhum input com nome ${name} nos componentes da modal ${modal}!`);
    }

    const inputData: Input = inputsData[name];

    return buildInput(inputData, modal, name, tags);
  });
}