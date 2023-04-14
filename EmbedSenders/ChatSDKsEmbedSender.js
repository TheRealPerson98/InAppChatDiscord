const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

class ChatSDKsEmbedSender {
  constructor(client, channelId) {
    this.client = client;
    this.channelId = channelId;
  }
  async clearSDKsChannel(sdkChannel) {
    let messagesExist = true;

    while (messagesExist) {
      const messages = await sdkChannel.messages.fetch({ limit: 100 });
      if (messages.size > 0) {
        await sdkChannel.bulkDelete(messages);
      } else {
        messagesExist = false;
      }
    }
  }
  createSDKsEmbed() {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Discover Our Flexible Chat API with Advanced Messaging SDKs for Your Communication Apps')
      .setDescription('Looking for modern messaging features for your mobile or web application? Look no further than our simple chat API with advanced messaging SDKs. Our platform is perfect for building interactive apps quickly and cost-effectively.')
      .addFields(
        {
          name: 'Direct and Group Messaging:',
          value: 'Our platform allows you to send and receive text messages, copy, edit, delete, and add a type indicator. You\'ll also get to read receipts, time stamps, push notifications, notification schedules, and more. In addition, our platform supports group messaging, complete with conversation returns, photo display, name display, media sharing, and other features.'
        },
        {
          name: 'Advanced Features:',
          value: 'Our platform has advanced features like global and local search, mentions, reactions, thread messages, status display, favorites, pin messages, presence indicators, gallery view, canned responses, and more. We also offer additional features such as E2E encryption, structured messages, encrypted messages, self-destructing chat, and blind text carbon copy.'
        },
        {
          name: 'Administration Management Tools:',
          value: 'Our platform includes administrative tools such as channel freezing, spam flood blocking, user deactivation, user provisioning, container vulnerability scanning, compliance reporting, profanity and domain filters, private and public group settings, group admin privileges, and message moderation , including images and media as a matter of course.'
        },
        {
          name: 'Resources and Support:',
          value: 'Our platform also offers resources like sample application assessments, advanced analytics dashboard, data export, data migration, message retrieval API, bug reporting, and 24/7 monitoring. You\'ll have access to email and chat support, as well as our ChatBot Studio and Intent Creator to help you create the perfect messaging experience.'
        }
      )  .setFooter({ text: 'InAppChat', iconURL: 'https://i.imgur.com/yPTgIKp.png' });

    return embed;
  }

  createButtonsRow() {
    const row = new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
          .setLabel('Chat SDKs')
          .setStyle('Link')
          .setURL('https://inappchat.io/peer-to-peer'),

        new ButtonBuilder()
          .setLabel('About Us')
          .setStyle('Link')
          .setURL('https://inappchat.io/about')
      );

    return row;
  }

  async sendSDKsEmbed() {
    const sdkChannel = this.client.channels.cache.get('1096244729928220773');
    await this.clearSDKsChannel(sdkChannel);

    // Send the image
    await sdkChannel.send({ files: ['chatsdklogo.png'] }); // Replace with your image file path

    // Send the welcome embed with buttons
    const sdksEmbed = this.createSDKsEmbed();
    const buttonsRow = this.createButtonsRow();
    await sdkChannel.send({ embeds: [sdksEmbed], components: [buttonsRow] });
  }
}

module.exports = ChatSDKsEmbedSender;
