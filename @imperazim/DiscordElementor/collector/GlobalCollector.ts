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

export class GlobalCollector {
  constructor(
    response: InteractionResponse | any,
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
    ) => void,
    componentType: ComponentType,
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
    ) => boolean
  ) {
    if (response) {
      const collector = response.createMessageComponentCollector({
        time: null,
        componentType: componentType,
        filter: filter,
      });
      if (collector) {
        collector.on("collect", callback);
      }
    }
  }
}
