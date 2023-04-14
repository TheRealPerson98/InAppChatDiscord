const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('report')
    .setDescription('Report a user or an issue')
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('The reason for the report')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('report_field')
        .setDescription('Additional report field')
        .setRequired(true)
    )
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to report')
        .setRequired(false)
    ),

  async execute(interaction) {
    const userToReport = interaction.options.getUser('user');
    const reportReason = interaction.options.getString('reason');
    const reportField = interaction.options.getString('report_field');

    const embed = new EmbedBuilder()
      .setColor('#FFA500')
      .setTitle('New Report')
      .setDescription(`Report from ${interaction.user.tag}`)
      .addFields(
        { name: 'User', value: userToReport ? userToReport.tag : 'N/A', inline: true },
        { name: 'Reason', value: reportReason, inline: true },
        { name: 'Report Field', value: reportField }
      )
      .setTimestamp();

    try {
      // Send the embed to a reports channel
      const reportsChannelId = '1096301935390375967'; // Replace with the ID of your reports channel
      const reportsChannel = await interaction.guild.channels.cache.get(reportsChannelId);
      await reportsChannel.send({ embeds: [embed] });

      await interaction.reply({ content: 'Your report has been submitted.', ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command.',
        ephemeral: true,
      });
    }
  },
};
