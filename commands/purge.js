const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

// Replace 'ROLE_ID_1' and 'ROLE_ID_2' with the actual role IDs you want to allow
const allowedRoles = ['1075104597493940265', '1096208046704820365'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Clears the last 100 messages in the channel'),

  async execute(interaction) {
    const memberRoles = interaction.member.roles.cache;
    const hasAllowedRole = allowedRoles.some(roleId => memberRoles.has(roleId));

    if (!hasAllowedRole) {
      return await interaction.reply({
        content: 'You do not have permission to use this command.',
        ephemeral: true,
      });
    }

    try {
      await interaction.deferReply({ ephemeral: true });

      await interaction.channel.bulkDelete(100, true);

      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Purge Complete')
        .setDescription('The last 100 messages in this channel have been cleared.');

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: 'There was an error while executing this command.',
        ephemeral: true,
      });
    }
  },
};
