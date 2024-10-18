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
} from "discord.js";

interface GlobalCollectorOptions {
  response: InteractionResponse | any;
  componentType: ComponentType;
  timeout: number;
  callback: (
    interaction:
      | ButtonInteraction
      | SelectMenuInteraction
      | ModalSubmitInteraction
      | RoleSelectMenuInteraction
      | UserSelectMenuInteraction
      | ChannelSelectMenuInteraction
      | MentionableSelectMenuInteraction
      | any
  ) => void;
  filter?: (
    interaction:
      | ButtonInteraction
      | SelectMenuInteraction
      | ModalSubmitInteraction
      | RoleSelectMenuInteraction
      | UserSelectMenuInteraction
      | ChannelSelectMenuInteraction
      | MentionableSelectMenuInteraction
      | any
  ) => boolean;
}

export class GlobalCollector {
  constructor(options: GlobalCollectorOptions) {
    const { response, componentType, timeout, callback, filter } = options;

    if (response) {
      const collector = response.createMessageComponentCollector({
        time: timeout,
        componentType: componentType,
        filter: filter,
      });

      if (collector) {
        collector.on("collect", callback);
      }
    }
  }
}
