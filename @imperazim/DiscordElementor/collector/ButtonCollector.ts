import { 
  ComponentType, 
  ButtonInteraction, 
  InteractionResponse, 
  InteractionCollector 
} from "discord.js";

/**
 * Coletor de interações de botões.
 */
export class ButtonCollector {
  constructor(
    response: InteractionResponse,
    callback: (interaction: ButtonInteraction) => void,
    timeout: number
  ) {
    if (response) {
      const collector: InteractionCollector<ButtonInteraction> = response.createMessageComponentCollector({
        time: timeout,
        componentType: ComponentType.Button,
        filter: (interaction: ButtonInteraction) => interaction.isButton(),
      });

      if (collector) {
        collector.on("collect", callback);
      }
    }
  }
}
