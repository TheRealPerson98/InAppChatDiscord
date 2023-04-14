const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user from the server')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to ban')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('The reason for the ban')
        .setRequired(false)
    ),

  async execute(interaction) {
    const requiredRoleId = '1096208046704820365'; // Replace with the ID of the required role
    const member = interaction.member;
    if (!member.roles.cache.has(requiredRoleId)) {
      return interaction.reply({ content: 'You do not have the required role to use this command.', ephemeral: true });
    }

    const userToBan = interaction.options.getUser('user');
    const banReason = interaction.options.getString('reason') || 'No reason provided';

    try {
      await interaction.deferReply({ ephemeral: true });

      const bannedMember = await interaction.guild.members.ban(userToBan, { reason: banReason });

      const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('User Banned')
        .setDescription(`User ${bannedMember.tag} has been banned.`)
        .addFields(
          { name: 'Banned by', value: interaction.user.tag },
          { name: 'Reason', value: banReason }
        );

      // Send the embed to a logs channel
      const logsChannelId = '1096278188671369298'; // Replace with the ID of your logs channel
      const logsChannel = await interaction.guild.channels.cache.get(logsChannelId);
      await logsChannel.send({ embeds: [embed] });

      // Send ephemeral message to the user who executed the command
      await interaction.editReply({ content: `User ${bannedMember.tag} has been banned.`, ephemeral: true });

    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: 'There was an error while executing this command.',
        ephemeral: true,
      });
    }
  },
};
