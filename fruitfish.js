'use strict';
const emoji = require('./emoji');
const players = require('./players');
const winnings = require('./winnings');
const settings = require('./settings');
const fmdatabase = require('./fmdatabase');
const d = require('./debug');

const nFruits = 5;
const prizeAmounts = [1, 5, 10, 50, 100];

class FruitFish {

	constructor() {
		this.fmdb = new fmdatabase.FMDatabase();
		this.winnings = new winnings.Winnings(this.fmdb);
		this.players = new players.Players(this.fmdb);
		this.settings = new settings.Settings(this.fmdb);
	}

	spin(interaction) {
		const serverid = interaction.guild.name;
		const pid = interaction.member.id;
		const pun = interaction.user.username;
 		const prizes = this.settings.getServerPrizes(serverid);
		if (!this.players.hasPlayer(pid, serverid)) {
			this.players.addPlayer(serverid, 1000, 0, pun, pid);
		}
		const p = this.players.getPlayer(pid, serverid);
		let outstr = 'abc';
		const numbers = new Array(3);
		for (let i = 0; i < numbers.length; i++) {
			numbers[i] = Math.floor(Math.random() * nFruits);
		}
		outstr = prizes[numbers[0]] + ' ' + prizes[numbers[1]] + ' ' +
      prizes[numbers[2]];
		// win
		if ((numbers[0] === numbers[1]) && (numbers[0] === numbers[2])) {
			p.score += prizeAmounts[numbers[0]] - 1;
			this.players.updatePlayer(p.score, p.highss, pun, pid, serverid);
			this.winnings.addWinnings(serverid, pid, prizes[numbers[0]]);
			outstr += '  +' + prizeAmounts[numbers[0]];
		}
		else {
			p.score -= 1;
			this.players.updatePlayer(p.score, p.highss, pun, pid, serverid);
			outstr += ' ' + p.score;
		}
		return outstr;
	}


	superspin(interaction) {
		const serverid = interaction.guild.name;
		const pid = interaction.member.id;
		const pun = interaction.user.username;
		const winningIndexs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
			[2, 5, 8], [0, 4, 8], [2, 4, 6]];
		const prizes = this.settings.getServerPrizes(serverid);

		if (!this.players.hasPlayer(pid, serverid)) {
			this.players.addPlayer(serverid, 1000, 0, pun, pid);
		}

		const p = this.players.getPlayer(pid, serverid);

		let outstr = 'abc';

		const numbers = new Array(9);
		for (let i = 0; i < numbers.length; i++) {
			numbers[i] = Math.floor(Math.random() * nFruits);
		}

		outstr = '\n' + prizes[numbers[0]] + ' ' + prizes[numbers[1]] + ' ' +
    prizes[numbers[2]] + '\n' + prizes[numbers[3]] + ' ' +
    prizes[numbers[4]] + ' ' + prizes[numbers[5]] + '\n' +
    prizes[numbers[6]] + ' ' + prizes[numbers[7]] + ' ' + prizes[numbers[8]];

		// win, super spin cost 10
		p.score -= 10;
		let spinOutcome = 0;

		winningIndexs.forEach((element) => {
			if ((numbers[element[0]] === numbers[element[1]]) &&
      (numbers[element[0]] === numbers[element[2]])) {
				spinOutcome += prizeAmounts[numbers[element[0]]];
				this.winnings.addWinnings(serverid, pid, prizes[numbers[element[0]]]);
				outstr += '  +' + prizeAmounts[numbers[element[0]]];
			}
		});
		if (spinOutcome > p.highss) {
			p.highss = spinOutcome;
		}
		p.score += spinOutcome;
		this.players.updatePlayer(p.score, p.highss, pun, pid, serverid);
		outstr += ' ' + p.score;
		// console.log(pun + " " + outstr);
		return outstr;
	}

	showprizes(interaction) {
		const serverid = interaction.guild.name;
		const prizes = this.settings.getServerPrizes(serverid);
		let outstr = '';
		for (let i = 0; i < nFruits; i++) {
			outstr += '\n' + prizes[i] + ' ' + prizes[i] + ' ' + prizes[i] +
			'  +' + prizeAmounts[i];
		}
		return outstr;
	}

}

const fm = new FruitFish();
module.exports.fm = fm;
