import {
  ChatInputCommandInteraction,
  ModalSubmitInteraction
} from "discord.js";

interface ModalCollectorOptions {
  response: ChatInputCommandInteraction;
  timeout: number;
  callback: (interaction: ModalSubmitInteraction) => void;
  filter?: (interaction: ModalSubmitInteraction) => boolean;
}

/**
 * Coletor de interações de modals.
 */
export class ModalCollector {
  constructor(options: ModalCollectorOptions) {
    const { response, timeout, callback, filter } = options;

    if (response && response.awaitModalSubmit) {
      // Chama awaitModalSubmit e lida com a promessa
      response.awaitModalSubmit({
        time: timeout,
        filter: filter || ((interaction: ModalSubmitInteraction) => interaction.isModalSubmit()),
      })
      .then(interaction => {
        // Chama o callback quando a interação é coletada
        if (interaction) {
          callback(interaction);
        }
      })
      .catch(error => {
        // Lide com o erro aqui, se necessário
        console.error('Erro ao coletar a interação de modal:', error);
      });
    }
  }
}
