const { SlashCommandBuilder } = require('discord.js');
const { fm } = require('../fruitfish.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('show fruitfish stats'),
	async execute(interaction) {
		await interaction.reply(fm.stats(interaction));
	},
};