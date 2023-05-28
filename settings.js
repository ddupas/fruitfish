'use strict';

const d = require('./debug');

class Settings {
	constructor(fmdbref) {
		d.debug('settings constructor');
		this.fmdb = fmdbref;
		this.serverSettingsSQL = 'SELECT * FROM settings WHERE server = ?';
		this.serverSettingsStatement = this.fmdb.db.prepare(this.serverSettingsSQL);
		this.getPrizesSQL = `select id as prize_number, value as prize from settings
where server = ? and ( id == '0' or id == '1' or id == '2' or id == '3'
or id == '4')`;
		this.getPrizesStatement = this.fmdb.db.prepare(this.getPrizesSQL);
		this.getServerPrefixSQL = 'select value as prefix from settings where ' +
'id = \'prefix\' and server = ?';
		this.getServerPrefixStatement = this.fmdb.db.prepare(this.getServerPrefixSQL);
		this.getServerPropSQL = 'select value as prop from settings where id = ? and server = ?';
		this.getServerPropStatement = this.fmdb.db.prepare(this.getServerPropSQL);
	}

	createNew(server) {
		const newServerSQL =
  `INSERT INTO settings (server,value,id) VALUES ('${server}','🍒',0);
INSERT INTO settings (server,value,id) VALUES ('${server}','🍋',1);
INSERT INTO settings (server,value,id) VALUES ('${server}','🍌',3);
INSERT INTO settings (server,value,id) VALUES ('${server}','🍇',2);
INSERT INTO settings (server,value,id) VALUES ('${server}','🍉',4);
INSERT INTO settings (server,value,id) VALUES
('${server}','352485891220176899','admin-user');
INSERT INTO settings (server,value,id) VALUES
('${server}','false','channel');`;
		this.fmdb.db.exec(newServerSQL);
	}

	getServerSettings(server) {
		let toret = null;
		toret = this.serverSettingsStatement.all(server);
		if (toret === undefined) {
			this.createNew(server);
			toret = this.serverSettingsStatement.all(server);
		}
		return toret;
	}

	hasServer(server) {
		return (typeof this.serverSettingsStatement.get(server) !== 'undefined');
	}

	getServerPrizes(server) {
		let result = this.getPrizesStatement.all(server);
		if (result.length == 0) {
			this.createNew(server);
			result = this.getPrizesStatement.all(server);
		}
		const toret = new Array(5);
		result.forEach((element) => {
			toret[element.prize_number] = element.prize;
		});
		return toret;
	}

	setPrize(emojii, id, server) {
		const setPrizeSQL = `UPDATE settings SET value =
    '${emojii}' WHERE id = '${id}' and server = '${server}'`;
		return this.fmdb.db.exec(setPrizeSQL);
	}

	getServerPrefix(server) {
		const result = this.getServerPrefixStatement.get(server);
		if (result === undefined) {
			this.createNew(server);
			return 'fm-';
		}
		return result.prefix;
	}

	setServerPrefix(prefix, server) {
		const setServerPrefixSQL = `update settings set value = '${prefix}' ` +
    `where id = 'prefix' and server = '${server}'`;
		return this.fmdb.db.exec(setServerPrefixSQL);
	}

	/*
   * current properties are: channel
   */
	getServerProp(property, server) {
		const result = this.getServerPropStatement.get(property, server);
		return result;
	}

	/*
   * admins is a multi prop
   */
	getMultiProp(property, server) {
		const getServerPropSQL = `select value as prop from settings
      where id = '${property}' and server = '${server}`;
		return this.fmdb.db.all(getServerPropSQL);
	}

	getMultiPropwithVal(property, server, value) {
		const getServerPropSQL = `select value as prop from settings
      where id = '${property}' and server = '${server} and value = ${value}`;
		return this.fmdb.db.get(getServerPropSQL);
	}
	/*
   * end of Settings Class
   */
}
module.exports.Settings = Settings;

/*

/// ///
/// / refactor to get_server_prop("alias")
const getServerAliasSQL = 'select value as alias from settings ' +
'where id = \'alias\' and server = ?'
const getServerAliasStatement = db.prepare(getServerAliasSQL)

function getServerAlias (server) {
  const result = getServerAliasStatement.get(server)
  return result.alias
}
module.exports.getServerAlias = getServerAlias

async function setServerAlias (alias, server) {
  const setServerAliasSQL = `update settings set value = '${alias}' ` +
  `where id = 'alias' and server = '${server}'`
  return await db.prepare(setServerAliasSQL).run()
}
module.exports.setServerAlias = setServerAlias
/// // refactor to get_server_prop("channel")
/// /

const getServerChannelSQL = 'select value as channel from settings ' +
'where id = \'channel\' and server = ?'
const getServerChannelStatement = db.prepare(getServerChannelSQL)

function getServerChannel (server) {
  const result = getServerChannelStatement.get(server)
  return result.channel
}
module.exports.getServerChannel = getServerChannel

async function setServerChannel (channel, server) {
  const setServerChannelSQL = `update settings set value = '${channel}' ` +
  `where id = 'channel' and server = '${server}'`
  return await db.exec(setServerChannelSQL)
}
module.exports.setServerChannel = setServerChannel

const isServerAdminSQL = 'select value as user from settings ' +
'where id = \'admin-user\' and server = ? and value = ?'
const isServerAdminStatement = db.prepare(isServerAdminSQL)

function isServerAdmin (msg) {
  const result = isServerAdminStatement.get(msg.guild.name, msg.author.id)
  return (typeof result !== 'undefined')
}
module.exports.isServerAdmin = isServerAdmin

const getServerAdminsSQL = 'select value as user from settings where ' +
'id = \'admin-user\' and server = ?'
const getServerAdminsStatement = db.prepare(getServerAdminsSQL)

function getServerAdmins (guildname) {
  const result = getServerAdminsStatement.all(guildname)
  return (result)
}
module.exports.getServerAdmins = getServerAdmins

function addServerAdmin (server, user) {
  const addServerAdminSQL = 'INSERT INTO settings (server,value,id) VALUES ' +
  `('${server}','${user}','admin-user')`
  let result = db.exec(addServerAdminSQL)
  console.log(JSON.stringify(result))
  result = getServerAdminsStatement.all(server)
  return (result)
}
module.exports.addServerAdmin = addServerAdmin

function delServerAdmin (server, user) {
  const delServerAdminSQL =
  `DELETE FROM settings WHERE server = '${server}' AND value = '${user}'`
  let result = db.exec(delServerAdminSQL)
  console.log(JSON.stringify(result))
  result = getServerAdminsStatement.all(server)
  return (result)
}
module.exports.delServerAdmin = delServerAdmin
*/
