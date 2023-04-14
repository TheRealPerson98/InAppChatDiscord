const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

class WelcomeEmbedSender {
  constructor(client, channelId) {
    this.client = client;
    this.channelId = channelId;
  }
  async clearWelcomeChannel(welcomeChannel) {
    let messagesExist = true;

    while (messagesExist) {
      const messages = await welcomeChannel.messages.fetch({ limit: 100 });
      if (messages.size > 0) {
        await welcomeChannel.bulkDelete(messages);
      } else {
        messagesExist = false;
      }
    }
  }
  createWelcomeEmbed() {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Welcome to the InAppChat Discord Server')
      .setDescription('We\'re delighted to have you join our community of chatbot enthusiasts and developers. Here, we discuss the potential of combining leading NLU platforms like Dialogflow, Lex, and Watson to create powerful, supercharged chatbots. Feel free to share your experiences, ask questions, and collaborate with fellow members on developing highly intelligent and efficient chatbots. Don\'t forget to check out our resources channel, where you\'ll find useful guides, documentation, and more. Together, let\'s explore the endless possibilities of chatbot technology! Enjoy your stay! 🚀');

    return embed;
  }

  createButtonsRow() {
		const row = new ActionRowBuilder()
      .addComponents(
				new ButtonBuilder()
          .setLabel('Website')
          .setStyle('Link')
        	.setURL('https://inappchat.io'),

				new ButtonBuilder()
          .setLabel('1Webchat')
          .setStyle('Link')
        	.setURL('https://inappchat.io/1webchat'),

        	new ButtonBuilder()
          .setLabel('1Chatbot')
          .setStyle('Link')
        	.setURL('https://inappchat.io/chatbots'),
        
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

  async sendWelcomeEmbed() {
    const welcomeChannel = this.client.channels.cache.get('1096271972851257515'); // replace with the channel ID of your #rules channel
    await this.clearWelcomeChannel(welcomeChannel);

    // Send the image
    await welcomeChannel.send({ files: ['logo.4d522ff0.png'] }); // Replace with your image file path

    // Send the welcome embed with buttons
    const welcomeEmbed = this.createWelcomeEmbed();
    const buttonsRow = this.createButtonsRow();
    await welcomeChannel.send({ embeds: [welcomeEmbed], components: [buttonsRow] });
  }
}

module.exports = WelcomeEmbedSender;
