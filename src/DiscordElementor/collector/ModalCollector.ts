import {
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  InteractionCollector
} from "discord.js";

/**
 * Coletor de interações de modals.
 */
export class ModalCollector {
  constructor(
    response: ChatInputCommandInteraction,
    timeout: number,
    callback: (interaction: ModalSubmitInteraction) => void
  ) {
    const collector: InteractionCollector<ModalSubmitInteraction> = response.client.on('interactionCreate', (interaction) => {
      if (!interaction.isModalSubmit()) return;

      if (interaction.user.id === response.user.id) {
        callback(interaction);
      }
    });

    collector.setTimeout(timeout);
  }
}
