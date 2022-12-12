'use strict';

const d = require('./debug');
const fs = require('fs-extra');

/*
 *
 */
class FMDatabase {
	constructor() {
		this.name = 'fruitmachine.db';
		this.db = require('better-sqlite3')(this.name);
		if (this.isNewDB()) {
			this.initNewDB();
		}
	}

	isNewDB() {
		const checkSQL = 'SELECT count(name) as ntables FROM sqlite_schema WHERE type =\'table\'';
		const ntables = this.db.prepare(checkSQL).get().ntables;
		return (ntables < 1);
	}

	initNewDB() {
		d.debug('init new db');
		const ctscript = fs.readFileSync('./create-tables.sql', 'utf8');
		this.db.exec(ctscript);
	}
}
module.exports.FMDatabase = FMDatabase;
