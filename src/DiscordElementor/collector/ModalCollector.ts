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
    callback: (interaction: ModalSubmitInteraction) => void
  ) {
    if (response && response.awaitModalSubmit) {
      const collector: InteractionCollector<ModalSubmitInteraction> = response.awaitModalSubmit({
        time: null,
        filter: (interaction: ModalSubmitInteraction) => interaction.isModalSubmit(),
      });

      if (collector) {
        collector.on("collect", callback); // Callback chamado quando uma interação é coletada
      }
    }
  }
}
