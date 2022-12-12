const { SlashCommandBuilder } = require('discord.js');
const { fm } = require('../fruitfish.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('superspin')
		.setDescription('tic-tac-toe match 3 emoji'),
	async execute(interaction) {

		await interaction.reply(fm.superspin(interaction));
	},
};