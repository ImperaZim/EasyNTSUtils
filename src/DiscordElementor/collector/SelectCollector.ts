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
      const collector = response.createMessageComponentCollector({
        time: timeout,
        componentType: ComponentType.StringSelect | ComponentType.UserSelect | ComponentType.RoleSelect | ComponentType.ChannelSelect,
        filter: (interaction) => {
          // Verifica se a interação é do tipo correto
          return (
            interaction.isStringSelectMenu() ||
            interaction.isUserSelectMenu() ||
            interaction.isRoleSelectMenu() ||
            interaction.isChannelSelectMenu() ||
            interaction.isMentionableSelectMenu() // Incluindo o MentionableSelect
          );
        },
      });

      // Adiciona o callback ao evento 'collect'
      collector.on("collect", callback);
    }
  }
}
