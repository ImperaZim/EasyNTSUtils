import {
  ComponentType,
  InteractionResponse,
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
  RoleSelectMenuInteraction,
  ChannelSelectMenuInteraction,
  MessageComponentInteractionCollector,
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
    ) => void
  ) {
    if (response) {
      const collector: MessageComponentInteractionCollector<
        | StringSelectMenuInteraction
        | UserSelectMenuInteraction
        | RoleSelectMenuInteraction
        | ChannelSelectMenuInteraction
      > = response.createMessageComponentCollector({
        time: null,
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
          return (
            interaction.isStringSelectMenu() ||
            interaction.isRoleSelectMenu() ||
            interaction.isUserSelectMenu() ||
            interaction.isChannelSelectMenu()
          );
        },
      });

      if (collector) {
        collector.on("collect", callback);
      }
    }
  }
}
