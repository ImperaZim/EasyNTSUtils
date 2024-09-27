import {
  ComponentType,
  ButtonInteraction,
  InteractionResponse,
  SelectMenuInteraction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  UserSelectMenuInteraction,
  ChannelSelectMenuInteraction,
  MentionableSelectMenuInteraction,
  MessageComponentCollector,
  Interaction,
} from "discord.js";

export type CollectorInteraction =
  | ButtonInteraction
  | SelectMenuInteraction
  | ModalSubmitInteraction
  | RoleSelectMenuInteraction
  | UserSelectMenuInteraction
  | ChannelSelectMenuInteraction
  | MentionableSelectMenuInteraction
  | Interaction;

/**
 * A class for collecting interactions on Discord message components.
 */
export class EmbedCollector {
  private collector?: MessageComponentCollector<CollectorInteraction>;

  /**
   * Initializes an EmbedCollector.
   * @param response - The interaction response or other source for creating the collector.
   * @param callback - The function to call when an interaction is collected.
   * @param componentType - The type of component to listen for (Button, SelectMenu, etc.).
   * @param filter - An optional filter function to apply to the collected interactions.
   */
  constructor(
    response: InteractionResponse | any,
    callback: (interaction: CollectorInteraction) => void,
    componentType: ComponentType,
    filter?: (interaction: CollectorInteraction) => boolean
  ) {
    if (response) {
      // Create the message component collector
      this.collector = response.createMessageComponentCollector({
        time: null, // Optional: You can set a time limit for how long the collector should run
        componentType: componentType,
        filter: filter,
      });

      // Set up the collector callback if the collector is successfully created
      if (this.collector) {
        this.collector.on("collect", callback);
      }
    }
  }
}
