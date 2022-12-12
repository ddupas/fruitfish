const { SlashCommandBuilder } = require('discord.js');
const { fm } = require('../fruitfish.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spin')
		.setDescription('match 3 emoji to win a prize'),
	async execute(interaction) {

		await interaction.reply(fm.spin(interaction));
	},
};
