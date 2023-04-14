const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

class OneChatbotEmbedSender {
  constructor(client, channelId) {
    this.client = client;
    this.channelId = channelId;
  }
  async clearChatbotChannel(chatbotChannel) {
    let messagesExist = true;

    while (messagesExist) {
      const messages = await chatbotChannel.messages.fetch({ limit: 100 });
      if (messages.size > 0) {
        await chatbotChannel.bulkDelete(messages);
      } else {
        messagesExist = false;
      }
    }
  }
  createChatbotEmbed() {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Benefits of Using Chat SDKs for Chatbot Development')
      .setDescription('Building a chatbot from scratch can be a challenging and time-consuming task. However, using chat SDKs and APIs can make the process faster and more manageable. 1Chatbot, for example, offers over 60 chat features, uses multiple NLUs and cloud providers, and makes it easy for developers to create powerful chatbots for any application.')
      .addFields(
        {
          name: 'Improved Performance with Multiple NLUs:',
          value: 'One significant benefit of using multiple NLUs is that each library has unique strengths and weaknesses that can improve the chatbot\'s performance. Incorporating multiple libraries can lead to better accuracy and a more satisfying user experience.'
        },
        {
          name: 'Efficient Development with Chat SDKs:',
          value: 'Using chat SDKs and APIs can save developers time and effort by utilizing existing platforms and tools to build conversational AI solutions. Chat APIs and SDKs provide a seamless user experience, can handle high user volumes, and integrate with existing systems and applications.'
        },
        {
          name: 'Access to Valuable Data with Chat SDKs and APIs:',
          value: 'Chat SDKs and APIs allow developers access to valuable data, such as user preferences and behaviors, which can be used to improve conversational AI solutions.'
        },
        {
          name: 'Cost-Effective Solutions:',
          value: 'Chat SDKs and APIs are cost-effective solutions because they eliminate the need for developers to start from scratch, reducing development time and resources.'
        }
        
      )  .setFooter({ text: 'InAppChat', iconURL: 'https://i.imgur.com/yPTgIKp.png' });


    return embed;
  }

  createButtonsRow() {
    const row = new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
          .setLabel('1Chatbot')
          .setStyle('Link')
          .setURL('https://inappchat.io/chatbots'),

        new ButtonBuilder()
          .setLabel('About Us')
          .setStyle('Link')
          .setURL('https://inappchat.io/about')
      );

    return row;
  }

  async sendChatbotEmbed() {
    const chatbotChannel = this.client.channels.cache.get('1096244708524695602');
    await this.clearChatbotChannel(chatbotChannel);

    // Send the image
    await chatbotChannel.send({ files: ['1chatbotlogo.png'] }); // Replace with your image file path

    // Send the welcome embed with buttons
    const chatbotEmbed = this.createChatbotEmbed();
    const buttonsRow = this.createButtonsRow();
    await chatbotChannel.send({ embeds: [chatbotEmbed], components: [buttonsRow] });
  }
}

module.exports = OneChatbotEmbedSender;
