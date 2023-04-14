const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

class WebchatEmbedSender {
  constructor(client, channelId) {
    this.client = client;
    this.channelId = channelId;
  }
  async clearWebchatChannel(webchatChannel) {
    let messagesExist = true;

    while (messagesExist) {
      const messages = await webchatChannel.messages.fetch({ limit: 100 });
      if (messages.size > 0) {
        await webchatChannel.bulkDelete(messages);
      } else {
        messagesExist = false;
      }
    }
  }
  createWebchatEmbed() {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Unleash the Power of Your Chatbot with 1Webchat: Combining Multiple NLUs and Cloud Providers')
      .setDescription('Raise your chatbot game with 1Webchat, a platform that simplifies the integration of your favorite Natural Language Understanding (NLU) library and cloud provider, and creates a versatile and robust chatbot for your website.')
      .addFields(
        {
          name: 'Quickly Integrate NLUs & Cloud Providers:',
          value: '1Webchat enables you to create modular and flexible chatbots, quickly integrating popular NLU libraries with cloud providers for customized chatbot solutions.'
        },
        {
          name: 'Create a Super Agent for Enhanced Versatility:',
          value: 'Combine multiple NLU libraries to form a super agent that covers more ground, ensuring accurate user input interpretation and optimized performance.'
        },
        {
          name: 'Future-Proof Your Chatbot:',
          value: 'The integration of multiple 1Webchat libraries reduces reliance on a single provider, protecting your chatbot from new libraries or abandonment while ensuring smooth user experiences through intelligent fallback logic.'
        }
      )  .setFooter({ text: 'InAppChat', iconURL: 'https://i.imgur.com/yPTgIKp.png' });

    return embed;
  }

  createButtonsRow() {
    const row = new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
          .setLabel('1Webchat')
          .setStyle('Link')
          .setURL('https://inappchat.io/1webchat'),

        new ButtonBuilder()
          .setLabel('About Us')
          .setStyle('Link')
          .setURL('https://inappchat.io/about')
      );

    return row;
  }

  async sendWebchatEmbed() {
    const webchatChannel = this.client.channels.cache.get('1096244686324244622'); // replace with the channel ID of your #rules channel
    await this.clearWebchatChannel(webchatChannel);

    // Send the image
    await webchatChannel.send({ files: ['1webchatlogo.png'] }); // Replace with your image file path

    // Send the welcome embed with buttons
    const webchatEmbed = this.createWebchatEmbed();
    const buttonsRow = this.createButtonsRow();
    await webchatChannel.send({ embeds: [webchatEmbed], components: [buttonsRow] });
  }
}

module.exports = WebchatEmbedSender;
