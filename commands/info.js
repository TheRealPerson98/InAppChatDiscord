const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Sends an information message with a link button'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('About In-App Chat')
      .setDescription('In-App Chat is the flagship product of Rip Bull Networks, a company that is focused on creating innovative technology for practical use cases. Our mission is to provide the world’s first distributed chatbot network featuring an end-to-end conversational AI platform.');

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel('Visit our website')
          .setURL('https://inappchat.io/about')
      );

    await interaction.reply({ content: 'Here is some information about our project:', ephemeral: true, embeds: [embed], components: [row] });
  }
};