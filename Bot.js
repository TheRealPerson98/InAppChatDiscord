const { Client, GatewayIntentBits, MessageEmbed, ActivityType} = require('discord.js');
const SlashCommandHandler = require('./SlashCommandHandler');
const MessageHandler = require('./Handlers/MessageHandler');
const RulesEmbedSender = require('./EmbedSenders/RulesEmbedSender');
const WelcomeEmbedSender = require('./EmbedSenders/WelcomeEmbedSender');
const WebchatEmbedSender = require('./EmbedSenders/WebchatEmbedSender');
const OneChatbotEmbedSender = require('./EmbedSenders/OneChatbotEmbedSender');
const ChatSDKsEmbedSender = require('./EmbedSenders/ChatSDKsEmbedSender');
const ModMailHandler = require('./Handlers/ModMailHandler');

class Bot {
  constructor(token) {
    this.token = token;
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages
      ]
    });

    this.slashCommandHandler = new SlashCommandHandler(this.client);
    this.messageHandler = new MessageHandler('./blocked_words.txt');
    this.rulesEmbedSender = new RulesEmbedSender(this.client);
    this.welcomeEmbedSender = new WelcomeEmbedSender(this.client);
    this.webchatEmbedSender = new WebchatEmbedSender(this.client); 
    this.onechatbotEmbedSender = new OneChatbotEmbedSender(this.client); 
    this.chatSDKsEmbedSender = new ChatSDKsEmbedSender(this.client); 
    this.modMailHandler = new ModMailHandler(this.client, '1096301935390375967'); 

    this.client.on('ready', () => {
    this.client.user.setPresence({
           activities: [{ name: `InAppChat`, type: ActivityType.Watching }],
            status: 'dnd',
          });
      this.rulesEmbedSender.sendRulesEmbeds();
      this.welcomeEmbedSender.sendWelcomeEmbed();
      this.webchatEmbedSender.sendWebchatEmbed();
      this.onechatbotEmbedSender.sendChatbotEmbed();
      this.chatSDKsEmbedSender.sendSDKsEmbed();

    });

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.client.on('messageCreate', message => {
      this.messageHandler.handle(message);
      this.modMailHandler.handle(message);
    });
    this.client.on('interactionCreate', interaction => this.slashCommandHandler.handleInteraction(interaction));
  }

  async start() {
    try {
      
      await this.slashCommandHandler.registerCommands();
      await this.client.login(this.token);
      console.log('Bot is now online!');
    } catch (error) {
      console.error('Error starting the bot:', error);
    }
  }
}

module.exports = Bot;
