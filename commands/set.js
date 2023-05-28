const { SlashCommandBuilder } = require('discord.js');
const { fm } = require('../fruitfish.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription('set prizes')
		
		.addStringOption(option =>
			option.setName('amount')
				.setDescription('coings')
				.setRequired(true)
				.addChoices(
					{ name: '1', value: '1' },
					{ name: '5', value: '5' },
					{ name: '10', value: '10' },
					{ name: '50', value: '50' },
					{ name: '100', value: '100' },
				))
		
		.addStringOption(option =>
			option.setName('prize')
				.setDescription('emoji prize')
				.setRequired(true)
				)
		,
	async execute(interaction) {
		await interaction.reply(fm.set(interaction));
	},
};

/*
module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription('sets prizes')
		.addStringOption(option =>
			option.setName('amount')
				.setDescription('coings')
				.setRequired(true)
				.addChoices(
					{ name: '1', value: '1' },
					{ name: '5', value: '5' },
					{ name: '10', value: '10' },
					{ name: '50', value: '50' },
					{ name: '100', value: '100' },
				))
		.addStringOption(option =>
			option.setName('emoji')
				.setDescription('emoji')
				.setRequired(true)
				),
	async execute(interaction) {
		await interaction.reply(fm.set(interaction));
	},
};
*/