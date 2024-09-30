import {
  ComponentType,
  InteractionResponse,
  SelectMenuInteraction,
  RoleSelectMenuInteraction,
  UserSelectMenuInteraction,
  ChannelSelectMenuInteraction,
  MentionableSelectMenuInteraction,
} from "discord.js";

export class SelectCollector {
  constructor(
    response: InteractionResponse | any,
    callback: (
      interaction:
        | SelectMenuInteraction
        | RoleSelectMenuInteraction
        | UserSelectMenuInteraction
        | ChannelSelectMenuInteraction
        | MentionableSelectMenuInteraction
        | any
    ) => void,
    componentType: ComponentType,
    timeout: number
    filter?: (
      interaction:
        | SelectMenuInteraction
        | RoleSelectMenuInteraction
        | UserSelectMenuInteraction
        | ChannelSelectMenuInteraction
        | MentionableSelectMenuInteraction
        | any
    ) => boolean,
  ) {
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