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

export class ModalCollector {
  constructor(options: ModalCollectorOptions) {
    const { response, timeout, callback, filter } = options;

    if (response && response.awaitModalSubmit) {
      response.awaitModalSubmit({
        time: timeout,
        filter: filter
      })
      .then(interaction => {
        if (interaction) {
          callback(interaction);
        }
      })
      .catch(error => {
        console.error('Erro ao coletar a interação de modal:', error);
      });
    }
  }
}
