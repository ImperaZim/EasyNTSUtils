import {
  ComponentType,
  InteractionResponse,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
  RoleSelectMenuInteraction,
  ChannelSelectMenuInteraction,
  MentionableSelectMenuInteraction,
  InteractionCollector,
} from "discord.js";

/**
 * Coletor de interações de menus de seleção.
 */
export class SelectMenuCollector {
  constructor(
    response: InteractionResponse,
    callback: (
      interaction:
        | StringSelectMenuInteraction
        | UserSelectMenuInteraction
        | RoleSelectMenuInteraction
        | ChannelSelectMenuInteraction
        | MentionableSelectMenuInteraction
    ) => void,
    timeout: number
  ) {
    if (response) {
      const collector: InteractionCollector<
        | StringSelectMenuInteraction
        | UserSelectMenuInteraction
        | RoleSelectMenuInteraction
        | ChannelSelectMenuInteraction
        | MentionableSelectMenuInteraction
      > = response.createMessageComponentCollector({
        time: timeout,
        componentType: [
          ComponentType.StringSelect,
          ComponentType.UserSelect,
          ComponentType.RoleSelect,
          ComponentType.ChannelSelect,
        ],
        filter: (
          interaction:
            | StringSelectMenuInteraction
            | UserSelectMenuInteraction
            | RoleSelectMenuInteraction
            | ChannelSelectMenuInteraction
        ) => {
          return interaction.isStringSelectMenu() ||
            interaction.isUserSelectMenu() ||
            interaction.isRoleSelectMenu() ||
            interaction.isChannelSelectMenu();
        },
      });

      if (collector) {
        collector.on("collect", callback);
      }
    }
  }
}
