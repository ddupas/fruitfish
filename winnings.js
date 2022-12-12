'use strict';

class Winnings {
	constructor(dbref) {
		this.fmdb = dbref;
		this.addWinningsSQL = 'INSERT INTO winnings (sid,pid,prize) VALUES (?, ?, ?)';
		this.addWinningsStatement = this.fmdb.db.prepare(this.addWinningsSQL);
		this.getPlayerWinningsSQL = 'SELECT prize FROM winnings ' +
    'WHERE sid = ? and pid = ?';
		this.getPlayerWinnigsStatement = this.fmdb.db.prepare(this.getPlayerWinningsSQL);
	}

	addWinnings(sid, pid, prize) {
		let e = null;
		try {
			e = this.addWinningsStatement.run(sid, pid, prize);
		}
		catch (duplicateError) {
			// do nothing duplicate
		}
		return e;
	}

	getPlayerWinnings(sid, pid) {
		return this.getPlayerWinnigsStatement.all(sid, pid);
	}
}
module.exports.Winnings = Winnings;
