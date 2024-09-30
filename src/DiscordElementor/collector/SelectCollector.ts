import {
  ComponentType,
  InteractionResponse,
  SelectMenuInteraction,
  RoleSelectMenuInteraction,
  UserSelectMenuInteraction,
  ChannelSelectMenuInteraction,
  MentionableSelectMenuInteraction,
} from "discord.js";

/**
 * Coletor de interações de menus de seleção.
 */
export class SelectMenuCollector {
  constructor(
    response: InteractionResponse,
    callback: (interaction: (SelectMenuInteraction | RoleSelectMenuInteraction | UserSelectMenuInteraction | ChannelSelectMenuInteraction | MentionableSelectMenuInteraction)) => void,
    timeout: number,
    componentType: ComponentType
  ) {
    if (response) {
      const collector = response.createMessageComponentCollector({
        time: timeout,
        componentType: componentType,
        filter: (interaction: (SelectMenuInteraction | RoleSelectMenuInteraction | UserSelectMenuInteraction | ChannelSelectMenuInteraction | MentionableSelectMenuInteraction)) => (interaction.isStringSelectMenu() ||
            interaction.isUserSelectMenu() ||
            interaction.isRoleSelectMenu() ||
            interaction.isChannelSelectMenu() ||
            interaction.isMentionableSelectMenu()),
      });

      if (collector) {
        collector.on("collect", callback);
      }
    }
  }
}
