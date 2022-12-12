'use strict'

const players = require('./players')
const winnings = require('./winnings')
// const emoji = require('./emoji')
const settings = require('./settings')
// const { Message } = require('discord.js')
const d = require('./debug')

const nFruits = 5
const prizeAmounts = [1, 5, 10, 50, 100]

class FruitMachine {
  constructor (fmdbref) {
    this.fmdb = fmdbref
    this.winnings = new winnings.Winnings(fmdbref)
    this.players = new players.Players(fmdbref)
    this.settings = new settings.Settings(fmdbref)
  }

  /*
   * public
   */
  help (message, parsed) {
    d.debug('help help help')
    const mgn = message.guild.name
    const helpson = {
      spin: 'Chance to win a prize (cost 1)',
      ss: '8 chances to win (cost 10)',
      'fight [rank]': 'fruit fight against player at rank',
      'ff [rank]': 'alias for fruit fight',
      prizes: 'Displays prizes',
      stats: 'Shows your score and more',
      top10: `${mgn} top 10`,
      leaderboard: `${mgn} leaderboard`,
      global: 'Global leaders',
      help: 'you-are-here',
      'admin-help': 'Displays admin commands'
    }
    let helpstr = '```txt\n'
    for (const [key, value] of Object.entries(helpson)) {
      helpstr += `\n${key.padStart(12, ' ')}: ${value}`
    }
    helpstr += '\n```'
    return helpstr
  }

  /*
   *  spin
   */
  spin (message, parsed) {
    d.debug('spin start')
    const serverid = message.guild.name
    const pid = message.author.id
    const pun = message.member.displayName
    const prizes = this.settings.getServerPrizes(serverid)

    if (!this.players.hasPlayer(pid, serverid)) {
      this.players.addPlayer(serverid, 1000, 0, pun, pid)
    }

    const p = this.players.getPlayer(pid, serverid)

    let outstr = 'abc'
    const numbers = new Array(3)
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = Math.floor(Math.random() * nFruits)
    }
    outstr = prizes[numbers[0]] + ' ' + prizes[numbers[1]] + ' ' +
      prizes[numbers[2]]
    // win
    if ((numbers[0] === numbers[1]) && (numbers[0] === numbers[2])) {
      p.score += prizeAmounts[numbers[0]] - 1
      this.players.updatePlayer(p.score, p.highss, pun, pid, serverid)
      this.winnings.addWinnings(serverid, pid, prizes[numbers[0]])
      outstr += '  +' + prizeAmounts[numbers[0]]
    } else {
      p.score -= 1
      this.players.updatePlayer(p.score, p.highss, pun, pid, serverid)
      outstr += ' ' + p.score
    }
    d.debug('spin done')
    return outstr
  }

  s = this.spin

  ss (message, parsed) {
    d.debug('ss')
  }

  sss = this.ss

  supperspin = this.ss

  ff (message, parsed) {
    d.debug('ff')
  }
}
module.exports.FruitMachine = FruitMachine

/*

function mention(){
const newfirstMentionTag = message?.mentions?.members.first(1)[0]?.user
  console.log(newfirstMentionTag)

  let skipMention = false
  // check for @fruitmachine
  try {
    if (typeof message.mentions === 'undefined') {
      skipMention = true
    }
    if (!skipMention) {
      if (typeof message.mentions.members === 'undefined') {
        skipMention = true
      }
    }

    if (!skipMention) {
      if (typeof message.mentions.members.first(1) === 'undefined') {
        skipMention = true
      }
    }
    if (!skipMention) {
      if (typeof message.mentions.members.first(1)[0] === 'undefined') {
        skipMention = true
      }
    }
    if (!skipMention) {
      if (typeof message.mentions.members.first(1)[0].user === 'undefined') {
        skipMention = true
      }
    }
    if (!skipMention) {
      const firstMentionTag = message.mentions.members.first(1)[0].user.tag

      if (firstMentionTag === 'fruitmachine#9521') {
        const prefix = settings.getServerPrefix(messageGuildName)
        const channelSetting = settings.getServerChannel(messageGuildName)
        const helpstr = 'help(messageGuildName)'                          //help
        return message.reply(`\nprefix is ${prefix}\nchannel is` +
          `${channelSetting}\n${prefix} help\n${helpstr}`)
      }
    }
  } catch (err) {
    // do nothing
    console.log('error looking for mention ' + err.message)
    return
  }

}

function superspin (serverid, pid, pun) {
  const winningIndexs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
    [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  const prizes = settings.getServerPrizes(serverid)

  if (!player.hasPlayer(pid, serverid)) {
    player.addPlayer(serverid, 1000, 0, pun, pid)
  }

  const p = player.getPlayer(pid, serverid)

  let outstr = 'abc'

  const numbers = new Array(9)
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = Math.floor(Math.random() * nFruits)
  }

  outstr = '\n' + prizes[numbers[0]] + ' ' + prizes[numbers[1]] + ' ' +
    prizes[numbers[2]] + '\n' + prizes[numbers[3]] + ' ' +
    prizes[numbers[4]] + ' ' + prizes[numbers[5]] + '\n' +
    prizes[numbers[6]] + ' ' + prizes[numbers[7]] + ' ' + prizes[numbers[8]]

  // win, super spin cost 10
  p.score -= 10
  let spinOutcome = 0

  winningIndexs.forEach((element) => {
    if ((numbers[element[0]] === numbers[element[1]]) &&
      (numbers[element[0]] === numbers[element[2]])) {
      spinOutcome += prizeAmounts[numbers[element[0]]]
      winnings.addWinnings(serverid, pid, prizes[numbers[element[0]]])
      outstr += '  +' + prizeAmounts[numbers[element[0]]]
    }
  })
  if (spinOutcome > p.highss) {
    p.highss = spinOutcome
  }
  p.score += spinOutcome
  player.updatePlayer(p.score, p.highss, pun, pid, serverid)
  outstr += ' ' + p.score
  // console.log(pun + " " + outstr);
  return outstr
}

function fightss (serverid) {
  let outstr = ''
  let spinOutcome = -10
  const winningIndexs = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  const prizes = settings.getServerPrizes(serverid)

  const numbers = new Array(9)
  for (let i = 0; i < numbers.length; i++) {
    numbers[i] = Math.floor(Math.random() * nFruits)
  }

  outstr = '\n' + prizes[numbers[0]] + ' ' + prizes[numbers[1]] + ' ' +
    prizes[numbers[2]] + '\n' + prizes[numbers[3]] + ' ' +
    prizes[numbers[4]] + ' ' + prizes[numbers[5]] + '\n' +
    prizes[numbers[6]] + ' ' + prizes[numbers[7]] + ' ' + prizes[numbers[8]]
  // win
  winningIndexs.forEach((element) => {
    if ((numbers[element[0]] === numbers[element[1]]) &&
      (numbers[element[0]] === numbers[element[2]])) {
      spinOutcome += prizeAmounts[numbers[element[0]]]
    }
  })
  const objtoret = { spinstring: outstr, spinoutcome: spinOutcome }
  return objtoret
}

// dont forget to manage the outcome high score history for the players ....
function fight (serverid, pid, pun, orank = 1) {
  let o = player.getRank(serverid, orank - 1)
  if (typeof o === 'undefined') {
    o = player.getRank(serverid, 0)
  }
  // player.server_first(serverid);
  // fight first place person for now, will add parameter later

  if (!player.hasPlayer(pid, serverid)) {
    player.addPlayer(serverid, 1000, 0, pun, pid)
  }

  const p = player.getPlayer(pid, serverid)

  p.spins = []
  o.spins = []

  let winner = null
  // let looser = null;

  while (winner === null) {
    const ps = fightss(serverid)
    const os = fightss(serverid)
    p.spins.push(ps)
    o.spins.push(os)

    if (os.spinoutcome > ps.spinoutcome) {
      winner = o
    } else if (ps.spinoutcome > os.spinoutcome) {
      winner = p
    }
  }

  let ostring = '\n```python\n'
  // ostring += `\n`+ mypadstart( o.name ,8) + '   ' + mypadstart(p.name,8);
  // ostring += JSON.stringify(o);
  ostring += `You        ${o.name}`
  ostring += '\n```'
  let otally = 0
  let ptally = 0

  for (let i = 0; i < o.spins.length; i++) {
    otally += o.spins[i].spinoutcome
    ptally += p.spins[i].spinoutcome
    const olines = o.spins[i].spinstring.split('\n')
    const plines = p.spins[i].spinstring.split('\n')
    ostring += '\n'
    ostring += plines[1] + '       ' + olines[1] + '\n'
    ostring += plines[2] + '       ' + olines[2] + '\n'
    ostring += plines[3] + '       ' + olines[3] + '\n'
  }

  if (p.id !== o.id) {
    p.score += ptally
    o.score += otally
    player.updatePlayer(p.score, p.highss, pun, pid, serverid)
    player.updatePlayer(o.score, o.highss, o.name, o.id, serverid)
  } else {
    p.score += ptally + otally
    player.updatePlayer(p.score, p.highss, pun, pid, serverid)
  }
  ostring += '\n```python'
  ostring += '\n' + mypadstart(ptally.toString(), 8) + '   ' +
    mypadstart(otally.toString(), 8)
  ostring += '\n' + mypadstart(p.score.toString(), 8) + '   ' +
    mypadstart(o.score.toString(), 8)

  p.rank = player.showRank(serverid, pid).rank
  o.rank = player.showRank(serverid, o.id).rank

  ostring += '\n' + mypadstart(p.rank.toString(), 8) + '   ' +
    mypadstart(o.rank.toString(), 8)

  ostring += '\n```'
  if (winner === p) {
    ostring += '🙂'
  } else {
    ostring += '🤷'
  }
  return ostring
}

async function showprizes (serverid) {
  // const serv = settings.getServer(serverid);
  const prizes = settings.getServerPrizes(serverid)
  let outstr = ''
  for (let i = 0; i < nFruits; i++) {
    outstr += '\n' + prizes[i] + ' ' + prizes[i] + ' ' + prizes[i] +
      '  +' + prizeAmounts[i]
  }
  return outstr
}

async function showtop10 (serverid) {
  let outstr = '\n```python\n'
  outstr += '#     FruitMachine Top 10 - ' + serverid
  const results = player.serverTop10(serverid)

  for (let i = 0; i < results.length; i++) {
    outstr += '\n' + (i + 1).toString().padStart(3) + ' '
    outstr += results[i].name.padStart(33, '.') + ' '
    outstr += results[i].score
  }
  // .log('t10: ' + outstr);
  outstr += '\n```'
  return outstr
}

function showleaderboard (serverid) {
  let outstr = '\n```python\n'
  outstr += '#     FruitMachine Leaderboard - ' + serverid
  const results = player.serverLeaderboard(serverid)

  for (let i = 0; i < results.length; i++) {
    outstr += '\n' + (i + 1).toString().padStart(3) + ' '
    outstr += results[i].name.padStart(33, '.') + ' '
    outstr += results[i].score
  }
  // .log('t10: ' + outstr);
  outstr += '\n```'
  return outstr
}

function unicodeLength (str) {
  return [...str].length
}

function mypadstart (str, width) {
  const l = unicodeLength(str)
  // console.log ('unicode l ' + l);
  return '.'.repeat(width - l) + str
}

async function showglobal () {
  let outstr = '\n```python\n'
  outstr += '#     FruitMachine Global Leaderboard'
  const results = player.global()
  for (let i = 0; i < results.length; i++) {
    outstr += '\n' + (i + 1).toString().padStart(3) + ' '
    // outstr += results[i].name.padStart(33, '.') + ' ';
    outstr += mypadstart(results[i].name, 33) + ' '
    outstr += results[i].score.toString().padStart(8, '.') + ' '
    outstr += results[i].server
  }
  outstr += '\n```'
  return outstr.substring(0, 1995)
}

async function stats (pid, serverid) {
  const p = player.getPlayer(pid, serverid)
  let outstr = 'score: ' + p.score + ' high super spin: ' + p.highss +
    ' prizes: '
  const curprizes = winnings.getPlayerWinnings(serverid, pid)
  for (const [, value] of Object.entries(curprizes)) {
    outstr += `${value.prize}`
  }
  return outstr
}

  if (parsed.command === 'guilds') {
    let toret = ''
    client.guilds.cache.array().forEach((element) => {
      toret += '\n' + element.name
    })
    return messagereply(message, toret)
  }

  if (parsed.command === 'gl') {
    let toret = ''
    const gid = message.guild.id
    // list.members.fetch().then(members => console.log(members));

    client.guilds.fetch(gid)
      .then(async (guild) => {
        console.log(guild.name + ' cached members\n')

        let lineno = -1

        guild.members.cache.forEach((member) => {
          lineno += 1
          if (!(lineno % 5)) {
            toret += '\n'
          }
          toret += member.user.username + ',\n'
        })
        // const gm = await guild.members.fetch();
        // console.log('gm : ' + JSON.stringify(gm));
      })
      .catch(console.error)
    return await messagereply(message, toret)
  }

  if (parsed.command === 'invite') return message.reply('\n<https://discord.com/api/oauth2/authorize?client_id=780118548760625163&permissions=2048&scope=bot>')

  if (parsed.command === 'spin') {
    const spinres = await
    spin(messageGuildName, message.author.id, message.member.displayName)
    return message.reply(spinres)
  }

  if (parsed.command === 'ss') {
    const spinres = await
    superspin(messageGuildName, message.author.id, message.member.displayName)
    return message.reply(spinres)
  }

  if ((parsed.command === 'ff') || (parsed.command === 'fight')) {
    const r = parsed.reader.getInt()
    const ffress = await
    fight(messageGuildName, message.author.id, message.member.displayName, r)
    return message.reply(ffress)
  }

  if (parsed.command === 'prizes') {
    return message.reply(await showprizes(messageGuildName))
  }

  if (parsed.command === 'top10') {
    return message.reply(await showtop10(messageGuildName))
  }

  if (parsed.command === 'leaderboard') {
    const toret = await showleaderboard(messageGuildName)
    return messagereply(message, toret)
  }

  if (parsed.command === 'global') {
    return messagereply(message, await showglobal())
  }

  if (parsed.command === 'stats') {
    return messagereply(message,
      await stats(message.author.id, messageGuildName))
  }

  if (parsed.command === 'ri') {
    const instr = parsed.reader.getRemaining()
    if ((instr === null) || (instr.length === 0)) {
      return message.reply('😜')
    }
    const toret = emoji.ri(instr)
    return message.reply(toret)
  }

  if (parsed.command === 'set') {
    if (!allowedAdmin(message)) {
      return message.reply('sorry, not admin')
    }
    const whichslot = parsed.reader.getInt()
    let newchar = parsed.reader.getString()
    if ((newchar === null) || (newchar.length === 0)) {
      newchar = emoji.re()
    }
    await settings.setPrize(newchar, whichslot, messageGuildName)
    return message.reply(await showprizes(messageGuildName))
  }

  if (parsed.command === 'prefix') {
    if (!allowedAdmin(message)) {
      return message.reply('sorry, not admin')
    }
    const newprefix = parsed.reader.getString()
    if ((newprefix === null) || (newprefix.length === 0)) {
      return message.reply(prefix + 'admin-help')
    }
    await settings.setServerPrefix(newprefix, messageGuildName)
    return message.reply(await settings.getServerPrefix(messageGuildName))
  }

  if (parsed.command === 'alias') {
    if (!allowedAdmin(message)) {
      return message.reply('sorry, not admin')
    }
    const boolstr = parsed.reader.getString()
    if ((boolstr === null) || (boolstr.length === 0)) {
      return message.reply(prefix + 'admin-help')
    }
    await settings.setServerAlias(boolstr, messageGuildName)
    return message.reply(await settings.getServerAlias(messageGuildName))
  }

  if (parsed.command === 'channel') {
    if (!allowedAdmin(message)) {
      return message.reply('sorry, not admin')
    }
    const channelstr = parsed.reader.getString()
    // channelstr = channelstr.trimLeft('<#');
    // channelstr = channelstr.trimRight('>');
    // console.log('channelstr : ' + channelstr);
    if ((channelstr === null) || (channelstr.length === 0)) {
      return message.reply(
        `${prefix} channel [false|#channel]\n` +
        'to disable or specify channel to restrict' +
        '\n@fruitmachine to show channel')
    }
    await settings.setServerChannel(channelstr, messageGuildName)
    return message.reply(await settings.getServerChannel(messageGuildName))
  }

  if (parsed.command === 'admin-user-list') {
    // console.log('admin user list');
    let outstr = ''
    const adminsId = settings.getServerAdmins(messageGuildName)
    adminsId.forEach((element) => {
      // console.log('each admin: ' + element.user);
      // Getting the user by ID.
      const User = client.users.cache.get(element.user)
      if (User) {
        outstr += User.tag + ' '
      } else {
        outstr += JSON.stringify(User)
      }
    })
    return message.reply(outstr)
  }
  if (parsed.command === 'admin-user-add') {
    if (!allowedAdmin(message)) {
      return message.reply('sorry, not admin')
    }
    let userstr = parsed.reader.getString()
    if (userstr.startsWith('<@!')) {
      userstr = userstr.substring(3, userstr.length - 4)
    }
    if ((userstr === null) || (userstr.length === 0)) {
      return message.reply(prefix + 'admin-help')
    }
    settings.addServerAdmin(messageGuildName, userstr)
    return settings.getServerAdmins(messageGuildName)
  }
  if (parsed.command === 'admin-user-del') {
    if (!allowedAdmin(message)) {
      return message.reply('sorry, not admin')
    }
    let userstr = parsed.reader.getString()
    if (userstr.startsWith('<@!')) {
      userstr = userstr.substring(3, userstr.length - 4)
    }
    if ((userstr === null) || (userstr.length === 0)) {
      return message.reply(prefix + 'admin-help')
    }
    await settings.delServerAdmin(messageGuildName, userstr)
    return settings.getServerAdmins(messageGuildName)
  }

  if (parsed.command === 'help') {
    return message.reply(help(messageGuildName))
  }

  if (parsed.command === 'admin-help') {
    const adminhelpson = {
      'set [0-4] [emojii]': 'set prize, 0-4, optional emojii',
      'alias [true|false]': 'enable s or Ss for spin',
      'channel [channel|false]': 'restrict to channel',
      'prefix *': 'change prefix to *',
      'prefix fm-': 'reset prefix to fm-',
      '@fruitmachine': 'display current prefix',
      'admin-user-add': 'add admin',
      'admin-user-del': 'del admin',
      'admin-user-list': 'list admins'
    }

    let helpstr = '```txt\n'
    for (const [key, value] of Object.entries(adminhelpson)) {
      helpstr += `\n${key.padStart(20, ' ')}: ${value}`
    }
    helpstr += '\n```'
    return message.reply(helpstr)
  }

function allowedAdmin (message) {
  if (settings.isServerAdmin(message)) { return true }
  if (message.member.hasPermission('ADMINISTRATOR')) { return true }
  return false
}

*/
