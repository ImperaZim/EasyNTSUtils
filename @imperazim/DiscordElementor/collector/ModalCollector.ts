import {
  InteractionResponse,
  ModalSubmitInteraction,
} from "discord.js";

interface ModalCollectorOptions {
  response: InteractionResponse | any;
  timeout: number;
  filter: (interaction: ModalSubmitInteraction | any) => boolean;
  callback: (interaction: ModalSubmitInteraction) => void;
}

export class ModalCollector {
  constructor(options: ModalCollectorOptions) {
    const { response, timeout, filter, callback } = options;

    if (response) {
      response
        .awaitModalSubmit({
          time: timeout,
          filter: filter,
        })
        .then((modal: ModalSubmitInteraction) => {
          if (modal) {
            callback(modal);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}

