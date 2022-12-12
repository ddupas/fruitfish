const { SlashCommandBuilder } = require('discord.js');
const { fm } = require('../fruitfish.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showprizes')
		.setDescription('show current prizes'),
	async execute(interaction) {

		await interaction.reply(fm.showprizes(interaction));
	},
};

