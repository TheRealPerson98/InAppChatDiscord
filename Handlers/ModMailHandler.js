const { EmbedBuilder } = require('discord.js');

class ModMailHandler {
  constructor(client, channelId) {
    this.client = client;
    this.channelId = channelId;
  }

  async handle(message) {
      console.log(`Received message from ${message.author.tag} in ${message.channel.type} channel`);

    if (message.author.bot || message.channel.type !== 'DM') {
    console.log('Ignoring non-DM message or message from bot');

      return;
    }

    const modmailChannel = this.client.channels.cache.get(this.channelId);

    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`Modmail from ${message.author.tag}`)
      .setDescription(message.content)
      .setThumbnail(message.author.displayAvatarURL())
      .addField('User ID', message.author.id, true);

    await modmailChannel.send({ embeds: [embed] });
  }
}

module.exports = ModMailHandler;
