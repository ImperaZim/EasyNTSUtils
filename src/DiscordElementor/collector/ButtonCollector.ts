import { 
  ComponentType, 
  ButtonInteraction, 
  InteractionResponse, 
  MessageComponentInteractionCollector 
} from "discord.js";

/**
 * Coletor de interações de botões.
 */
export class ButtonCollector {
  constructor(
    response: InteractionResponse,
    callback: (interaction: ButtonInteraction) => void
  ) {
    if (response) {
      const collector: MessageComponentInteractionCollector<ButtonInteraction> = response.createMessageComponentCollector({
        time: null,
        componentType: ComponentType.Button,
        filter: (interaction: ButtonInteraction) => interaction.isButton(),
      });

      if (collector) {
        collector.on("collect", callback);
      }
    }
  }
}
