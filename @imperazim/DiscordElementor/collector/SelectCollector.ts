import {
  ComponentType,
  InteractionResponse,
  SelectMenuInteraction,
  RoleSelectMenuInteraction,
  UserSelectMenuInteraction,
  ChannelSelectMenuInteraction,
  MentionableSelectMenuInteraction,
} from "discord.js";

export type SelectInteractionTypes = SelectMenuInteraction
  | RoleSelectMenuInteraction
  | UserSelectMenuInteraction
  | ChannelSelectMenuInteraction
  | MentionableSelectMenuInteraction
  | any;

export class SelectCollector {
  constructor(
    response: InteractionResponse | any,
    callback: (interaction: SelectInteractionTypes) => void,
    componentType: ComponentType,
    timeout: number,
    filter?: (
      interaction: SelectInteractionTypes
    ) => boolean
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