'use strict';

const d = require('./debug');

class Players {
	constructor(fmdbref) {
		d.debug('players constructor');
		this.fmdb = fmdbref;
		this.hasPlayerSQL = 'SELECT * FROM players WHERE id = ? and server = ?';
		this.hasPlayerStatement = this.fmdb.db.prepare(this.hasPlayerSQL);
		this.addPlayerSQL = 'INSERT INTO players (server,score,highss,name,id)' +
      'VALUES (?, ?, ?, ?, ?)';
		this.addPlayerStatement = this.fmdb.db.prepare(this.addPlayerSQL);
		this.updatePlayerSQL = 'UPDATE players SET score = ?, highss = ?, ' +
      'name = ? WHERE id = ? and server = ?';
		this.updatePlayerStatement = this.fmdb.db.prepare(this.updatePlayerSQL);
		this.globalSQL = 'SELECT name,score,server FROM players ' +
      'ORDER BY score DESC LIMIT 50';
		this.globalStatement = this.fmdb.db.prepare(this.globalSQL);
		this.serverTop10SQL = 'SELECT name,score FROM players WHERE ' +
      'server = ? ORDER BY score DESC LIMIT 10';
		this.serverTop10Statement = this.fmdb.db.prepare(this.serverTop10SQL);
		this.serverLeaderboardSQL = 'SELECT name,score FROM players WHERE ' +
      'server = ? ORDER BY score DESC LIMIT 30';
		this.serverLeaderboardStatement = this.fmdb.db.prepare(this.serverLeaderboardSQL);
		this.getRankSQL = 'SELECT * FROM players WHERE server = ? ' +
      'ORDER BY score DESC LIMIT 1 OFFSET ?';
		this.getRankStatement = this.fmdb.db.prepare(this.getRankSQL);
		this.serverSearchSQL = 'SELECT * FROM players WHERE server = ? AND name = ?';
		this.serverSearchStatement = this.fmdb.db.prepare(this.serverSearchSQL);
		this.showRankSQL = 'select * from ( SELECT row_number() OVER ( ORDER BY score DESC ) rank, ' +
      '* FROM players where server = ?) t where id = ? ';
		this.showRankStatement = this.fmdb.db.prepare(this.showRankSQL);
	}

	getPlayer(id, server) {
		return this.hasPlayerStatement.get(id, server);
	}

	hasPlayer(id, server) {
		return (typeof this.hasPlayerStatement.get(id, server) !== 'undefined');
	}

	addPlayer(server, score, highss, name, id) {
		return this.addPlayerStatement.run(server, score, highss, name, id);
	}

	updatePlayer(score, highss, name, id, server) {
		return this.updatePlayerStatement.run(score, highss, name, id, server);
	}

	global() {
		return this.globalStatement.all();
	}

	serverTop10(server) {
		return this.serverTop10Statement.all(server);
	}

	serverLeaderboard(server) {
		return this.serverLeaderboardStatement.all(server);
	}

	getRank(server, r) {
		return this.getRankStatement.get(server, r);
	}

	showRank(server, id) {
		return this.showRankStatement.get(server, id);
	}

	/*
   * end class Players
   */
}
module.exports.Players = Players;
