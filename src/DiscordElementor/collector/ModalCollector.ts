import {
  InteractionResponse,
  ModalSubmitInteraction,
  InteractionCollector,
  Client
} from "discord.js";

/**
 * Coletor de interações de modals.
 */
export class ModalCollector {
  constructor(
    client: Client,
    callback: (interaction: ModalSubmitInteraction) => void
  ) {
    const collector: InteractionCollector<ModalSubmitInteraction> = client.awaitModalSubmit({
      time: null,
      filter: (interaction: ModalSubmitInteraction) => interaction.isModalSubmit(),
    });

    if (collector) {
      collector.on("collect", callback);
    }
  }
}
