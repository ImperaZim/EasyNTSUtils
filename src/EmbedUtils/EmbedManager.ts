import {
  EmbedBuilder,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  ModalBuilder,
  TextInputBuilder,
} from "discord.js";
import { get } from "./EmbedRegistry";
import { Tags, ActionRows } from "./interfaces/BuilderInterface";

/**
 * Replaces placeholders in the input string with the provided replacements.
 * @param input The string to transmorph.
 * @param replacements A record of placeholders and their replacements.
 * @returns The transmorphed string.
 */
function transmorph(input: string, replacements: Record<string, string>): string {
  if (input != null) {
    for (const key in replacements) {
      input = input.replace(new RegExp(`{${key}}`, "g"), replacements[key]);
    }
  }
  return input;
}

/**
 * Creates an array of EmbedBuilder instances from the provided embed data and tags.
 * @param embedData The data used to build the embeds.
 * @param tags A record of tags for translation.
 * @returns An array of EmbedBuilder objects.
 */
function createEmbed(embedData: any, tags: Tags): EmbedBuilder[] {
  const embeds: EmbedBuilder[] = [];
  if (embedData) {
    for (const embed of embedData) {
      const builder = new EmbedBuilder().setColor(embed.color || "#4d6d86");
      if (embed.title) builder.setTitle(transmorph(embed.title, tags));
      if (embed.image) builder.setImage(transmorph(embed.image, tags));
      if (embed.thumbnail) builder.setThumbnail(transmorph(embed.thumbnail, tags));
      if (embed.description) builder.setDescription(transmorph(embed.description, tags));

      if (embed.fields) {
        builder.addFields(
          embed.fields.map((field: any) => ({
            name: transmorph(field.name || "", tags),
            value: transmorph(field.value || "", tags),
          }))
        );
      }

      if (embed.footer) {
        builder.setFooter({
          text: transmorph(embed.footer.text || "", tags),
          iconURL: transmorph(embed.footer.iconURL || null, tags),
        });
      }

      if (embed.author) {
        builder.setAuthor({
          name: transmorph(embed.author.name || "", tags),
          iconURL: transmorph(embed.author.iconURL || null, tags),
        });
      }
      embeds.push(builder);
    }
  }
  return embeds;
}

/**
 * Creates an ActionRow containing different component types (buttons, selects, modals).
 * @param componentsData The data for the components.
 * @param tags A record of tags for translation.
 * @returns An ActionRow containing components.
 */
function createActionRowFromComponents(
  componentsData: any,
  tags: Tags
): ActionRowBuilder<ButtonBuilder | SelectMenuBuilder> {
  const actionRow = new ActionRowBuilder<ButtonBuilder | SelectMenuBuilder>();

  if (componentsData) {
    componentsData.forEach((component: any) => {
      if (component) {
        if (component.type === "button") {
          const button = new ButtonBuilder();
          if (component.label) button.setLabel(transmorph(component.label, tags));
          if (component.style) button.setStyle(component.style);
          if (component.style === ButtonStyle.Link && component.url) {
            button.setURL(transmorph(component.url, tags));
          } else {
            if (component.emoji) button.setEmoji(transmorph(component.emoji, tags));
            if (component.disable) button.setDisabled(component.disable);
            button.setCustomId(component.customid ? transmorph(component.customid, tags) : "error");
          }
          actionRow.addComponents(button);
        }

        if (component.type === "select") {
          const select = new SelectMenuBuilder();
          if (component.customid) select.setCustomId(transmorph(component.customid, tags));
          if (component.options) {
            select.addOptions(
              component.options.map((option: any) => ({
                label: transmorph(option.label, tags),
                value: transmorph(option.value, tags),
              }))
            );
          }
          actionRow.addComponents(select);
        }
      }
    });
  }

  return actionRow;
}

/**
 * Creates a modal component with text inputs.
 * @param modalData The data for the modal.
 * @param tags A record of tags for translation.
 * @returns A ModalBuilder object containing text inputs.
 */
function createModal(modalData: any, tags: Tags): ModalBuilder {
  const modal = new ModalBuilder().setCustomId(transmorph(modalData.customid, tags));
  if (modalData.title) modal.setTitle(transmorph(modalData.title, tags));

  if (modalData.components) {
    const textInputs = modalData.components.map((input: any) => {
      const textInput = new TextInputBuilder()
        .setCustomId(transmorph(input.customid, tags))
        .setLabel(transmorph(input.label, tags))
        .setStyle(input.style);
      return textInput;
    });
    modal.addComponents(textInputs);
  }

  return modal;
}

/**
 * Retrieves a reply based on the name and tags provided, with optional custom data.
 * @param name The name of the reply.
 * @param tags A record of tags for translation.
 * @param custom Optional custom data for the reply.
 * @returns An object containing embeds and components.
 */
export function getReply(name: string, tags: Tags, custom: any = null) {
  let embed: EmbedBuilder[] = [];
  let components = undefined;
  let modal = undefined;

  const builderData = get(name);
  if (builderData) {
    if (builderData.embeds) embed = createEmbed(builderData.embeds, tags);
    if (builderData.components) components = [createActionRowFromComponents(builderData.components, tags)];
    if (builderData.modal) modal = createModal(builderData.modal, tags);
  } else if (custom) {
    if (custom.embeds) embed = createEmbed(custom.embeds, tags);
    if (custom.components) components = [createActionRowFromComponents(custom.components, tags)];
    if (custom.modal) modal = createModal(custom.modal, tags);
  }

  components = (components || []).map((ar) => ar.toJSON());
  return { embed, components, modal };
}

/**
 * Retrieves a button by its target ID, and adds a reply if it's associated with another component.
 * @param targetId The ID of the target button.
 * @param tags A record of tags for translation.
 * @returns The found component or null if not found.
 */
export function getButton(targetId: string, tags: Tags) {
  for (const key in get("", true)) {
    if (get("", true).hasOwnProperty(key)) {
      const obj: ActionRows = get(key);
      if (obj.components) {
        const foundComponent = obj.components.find(
          (component) => component?.customid === targetId
        );
        if (foundComponent) {
          if (foundComponent.open) {
            foundComponent.reply = getReply(foundComponent.open, tags);
          }
          return foundComponent;
        }
      }
    }
  }
  return null;
}
