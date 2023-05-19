const { SlashCommandBuilder } = require('discord.js');
const { fm } = require('../fruitfish.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showleaderboard')
		.setDescription('show leaderboard'),
	async execute(interaction) {

		await interaction.reply(fm.showleaderboard(interaction));
	},
};

