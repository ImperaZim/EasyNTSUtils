import { registerRow, getRow, Row } from "DiscordRow";
import { registerModal, getModal, Modal } from "DiscordModal";
import { ButtonStyle, ChannelType, TextInputStyle } from "discord.js";

export const row_1: Row = {
  embeds: {
    embed_1: {
      color: 111111,
      title: "text",
      url: "https://google.com",
      aurhor: {
        name: "text",
        iconURL: "https://google.com"
      },
      description: "text",
      thumbnail: "https://google.com",
      fields: [
        {
          name: "text",
          value: "text"
        },
        {
          name: "text",
          value: "text"
        },
        {
          name: "text",
          value: "text"
        }
      ],
      image: "https://google.com",
      timestamp: true,
      footer: {
        name: "text",
        iconURL: "https://google.com"
      },
    },
    embed_2: {
      color: 111111,
      title: "text",
      url: "https://google.com",
      aurhor: {
        name: "text",
        iconURL: "https://google.com"
      },
      description: "text",
      thumbnail: "https://google.com",
      fields: [
        {
          name: "text",
          value: "text"
        },
        {
          name: "text",
          value: "text"
        },
        {
          name: "text",
          value: "text"
        }
      ],
      image: "https://google.com",
      timestamp: true,
      footer: {
        name: "text",
        iconURL: "https://google.com"
      },
    }
  },
  components: {
    buttons: {
      button_link: {
        type: ButtonStyle.Link,
        data: {
          label: "text",
          url: "https://google.com",
          onInteract: {
            elementType: "modal",
            elementIdentifier: "modal_1",
          }
        }
      },
      button_primary: {
        type: ButtonStyle.Primary,
        data: {
          label: "text",
          emoji: "text"
        }
      },
      button_secondary: {
        type: ButtonStyle.Secondary,
        data: {
          label: "text",
          emoji: "text"
        }
      },
      button_success: {
        type: ButtonStyle.Success,
        data: {
          label: "text",
          emoji: "text"
        }
      },
      button_danger: {
        type: ButtonStyle.Danger,
        data: {
          label: "text",
          emoji: "text"
        }
      }
    },
    selects: {
      select_string: {
        type: "string",
        data: {
          disabled: false,
          placeholder: "text",
          options: [
            {
              label: "text",
              description: "text",
              value: "text"
            },
            {
              label: "text",
              description: "text",
              value: "text"
            },
            {
              label: "text",
              description: "text",
              value: "text"
            }
          ],
          onSubmit: {
            elementType: "modal",
            elementIdentifier: "modal_1",
          }
        }
      },
      select_user: {
        type: "user",
        data: {
          disabled: false,
          placeholder: "text",
          minValue: 1,
          maxValue: 10
        }
      },
      select_channel: {
        type: "channel",
        data: {
          disabled: false,
          placeholder: "text",
          minValue: 1,
          maxValue: 10,
          channelTypes: [
            ChannelType.GuildText,
            ChannelType.GuildVoice
          ]
        }
      },
      select_role: {
        type: "role",
        data: {
          disabled: false,
          placeholder: "text",
          minValue: 1,
          maxValue: 10
        }
      },
    }
  }
};
export const modal_1: Modal = {
  title: "text",
  components: {
    inputs: {
      short_input: {
        label: "text",
        minLength: 1,
        maxLength: 100,
        placeholder: "text",
        value: "text",
        required: false,
        style: TextInputStyle.Short
      },
      paragraph_input: {
        label: "text",
        minLength: 1,
        maxLength: 100,
        placeholder: "text",
        value: "text",
        required: false,
        style: TextInputStyle.Paragraph
      }
    }
  },
  onSubmit: {
    elementType: "row",
    elementIdentifier: "row_1",
  }
}


registerRow("row_1", row_1);
registerModal("modal_1", modal_1);


console.log(getRow("row_1", {}));
console.log(getModal("modal_1", {}));