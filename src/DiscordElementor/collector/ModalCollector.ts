import { 
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  InteractionCollector,
  CacheType
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
    if (response && response.awaitModalSubmit) {
      const collector: Promise<ModalSubmitInteraction<CacheType>> = response.awaitModalSubmit({
        time: timeout,
        filter: (interaction: ModalSubmitInteraction) => interaction.isModalSubmit(),
      });

      if (collector) {
        collector.on("collect", callback); // Callback chamado quando uma interação é coletada
      }
    }
  }
}