'use strict';

const basicEmojii = [
	'⌚', '⌛', '⏩', '⏬', '⏰', '⏳', '◽', '◾', '☔', '☕', '♈', '♓', '♿', '⚓', '⚡',
	'⚪', '⚫', '⚽', '⚾', '⛄', '⛅', '⛎', '⛔', '⛪', '⛲', '⛳', '⛵', '⛺', '⛽', '✅',
	'✊', '✋', '✨', '❌', '❎', '❓', '❕', '❗', '➕', '➗', '➰', '➿', '⬛', '⬜', '⭐',
	'⭕', '🀄', '🃏', '🆎', '🆑', '🆚', '🈁', '🈚', '🈯', '🈲', '🈶', '🈸', '🈺', '🉐', '🉑',
	'🌀', '🌌', '🌍', '🌎', '🌏', '🌐', '🌑', '🌒', '🌓', '🌕', '🌖', '🌘', '🌙', '🌚', '🌛',
	'🌜', '🌝', '🌞', '🌟', '🌠', '🌭', '🌯', '🌰', '🌱', '🌲', '🌳', '🌴', '🌵', '🌷', '🍊',
	'🍋', '🍌', '🍏', '🍐', '🍑', '🍻', '🍼', '🍾', '🍿', '🎀', '🎓', '🎠', '🏄', '🏅', '🏆',
	'🏇', '🏈', '🏉', '🏊', '🏏', '🏓', '🏠', '🏣', '🏤', '🏥', '🏰', '🏴', '🏸', '🐇', '🐈',
	'🐉', '🐋', '🐌', '🐎', '🐏', '🐐', '🐑', '🐒', '🐓', '🐔', '🐕', '🐖', '🐗', '🐩', '🐪',
	'🐫', '🐾', '👀', '👂', '👤', '👥', '👦', '👫', '👬', '👭', '👮', '💬', '💭', '💮', '💵',
	'💶', '💷', '💸', '📫', '📬', '📭', '📮', '📯', '📰', '📴', '📵', '📶', '📷', '📸', '📹',
	'📼', '📿', '🔂', '🔃', '🔄', '🔇', '🔈', '🔉', '🔊', '🔔', '🔕', '🔖', '🔫', '🔬', '🔭',
	'🔮', '🔽', '🕋', '🕎', '🕐', '🕛', '🕜', '🕧', '🕺', '🖕', '🖖', '🖤', '🗻', '🗿', '😀',
	'😁', '😆', '😇', '😈', '😉', '😍', '😎', '😏', '😐', '😑', '😒', '😔', '😕', '😖', '😗',
	'😘', '😙', '😚', '😛', '😜', '😞', '😟', '😠', '😥', '😦', '😧', '😨', '😫', '😬', '😭',
	'😮', '😯', '😰', '😳', '😴', '😵', '😶', '😷', '🙀', '🙁', '🙄', '🙅', '🙏', '🚀', '🚁',
	'🚂', '🚃', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚋', '🚌', '🚍', '🚎', '🚏', '🚐', '🚑',
	'🚓', '🚔', '🚕', '🚖', '🚗', '🚘', '🚙', '🚚', '🚛', '🚡', '🚢', '🚣', '🚤', '🚥', '🚦',
	'🚧', '🚭', '🚮', '🚱', '🚲', '🚳', '🚵', '🚶', '🚷', '🚸', '🚹', '🚾', '🚿', '🛀', '🛁',
	'🛅', '🛌', '🛐', '🛑', '🛒', '🛕', '🛖', '🛗', '🛫', '🛬', '🛴', '🛶', '🛷', '🛸', '🛹',
	'🛺', '🛻', '🛼', '🟠', '🟫', '🤌', '🤍', '🤏', '🤐', '🤘', '🤙', '🤞', '🤟', '🤠', '🤧',
	'🤨', '🤯', '🤰', '🤱', '🤲', '🤳', '🤺', '🤼', '🤾', '🤿', '🥀', '🥅', '🥇', '🥋', '🥌',
	'🥍', '🥏', '🥐', '🥞', '🥟', '🥫', '🥬', '🥰', '🥱', '🥲', '🥳', '🥶', '🥷', '🥸', '🥺',
	'🥻', '🥼', '🥿', '🦀', '🦄', '🦅', '🦑', '🦒', '🦗', '🦘', '🦢', '🦣', '🦤', '🦥', '🦪',
	'🦫', '🦭', '🦮', '🦯', '🦰', '🦹', '🦺', '🦿', '🧀', '🧁', '🧂', '🧃', '🧊', '🧋', '🧍',
	'🧏', '🧐', '🧦', '🧧', '🧿', '🩰', '🩳', '🩴', '🩸', '🩺', '🪀', '🪂', '🪃', '🪆', '🪐',
	'🪕', '🪖', '🪨', '🪰', '🪶', '🫀', '🫂', '🫐', '🫖', '©️', '®️', '‼️', '⁉️', '™️',
	'ℹ️', '↔️', '↕️', '↖️', '↗️', '↘️', '↙️', '↩️', '↪️', '⌨️', '⏏️', '⏭️', '⏮️',
	'⏯️', '⏱️', '⏲️', '⏸️', '⏹️', '⏺️', 'Ⓜ️', '▪️', '▫️', '▶️', '◀️', '◻️', '◼️',
	'☀️', '☁️', '☂️', '☃️', '☄️', '☎️', '☑️', '☘️', '☝️', '☠️', '☢️', '☣️', '☦️',
	'☪️', '☮️', '☯️', '☸️', '☹️', '☺️', '♀️', '♂️', '♟️', '♠️', '♣️', '♥️', '♦️',
	'♨️', '♻️', '♾️', '⚒️', '⚔️', '⚕️', '⚖️', '⚗️', '⚙️', '⚛️', '⚜️', '⚠️', '⚧️',
	'⚰️', '⚱️', '⛈️', '⛏️', '⛑️', '⛓️', '⛩️', '⛰️', '⛱️', '⛴️', '⛷️', '⛸️',
	'⛹️', '✂️', '✈️', '✉️', '✌️', '✍️', '✏️', '✒️', '✔️', '✖️', '✝️', '✡️',
	'✳️', '✴️', '❄️', '❇️', '❣️', '❤️', '➡️', '⤴️', '⤵️', '⬅️', '⬆️', '⬇️',
	'〰️', '〽️', '㊗️', '㊙️', '🅰️', '🅱️', '🅾️', '🅿️', '🈂️', '🈷️', '🌡️', '🌤️', '🌥️',
	'🌦️', '🌧️', '🌨️', '🌩️', '🌪️', '🌫️', '🌬️', '🌶️', '🍽️', '🎖️', '🎗️', '🎙️',
	'🎚️', '🎛️', '🎞️', '🎟️', '🏋️', '🏌️', '🏍️', '🏎️', '🏔️', '🏕️', '🏖️', '🏗️',
	'🏘️', '🏙️', '🏚️', '🏛️', '🏜️', '🏝️', '🏞️', '🏟️', '🏳️', '🏵️', '🏷️', '🐿️',
	'👁️', '📽️', '🕉️', '🕊️', '🕯️', '🕰️', '🕳️', '🕴️', '🕵️', '🕶️', '🕷️', '🕸️', '🕹️',
	'🖇️', '🖊️', '🖋️', '🖌️', '🖍️', '🖐️', '🖥️', '🖨️', '🖱️', '🖲️', '🖼️', '🗂️', '🗃️',
	'🗄️', '🗑️', '🗒️', '🗓️', '🗜️', '🗝️', '🗞️', '🗡️', '🗣️', '🗨️', '🗯️', '🗳️', '🗺️',
	'🛋️', '🛍️', '🛎️'];
module.exports.basicEmojii = basicEmojii;

function re() {
	const len = basicEmojii.length;
	const index = Math.floor(Math.random() * len);
	return basicEmojii[index];
}

module.exports.re = re;

const abc = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭',
	'🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷',
	'🇸', '🇹', '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'];

function ri(sentance = 'puppy') {
	// abc['c'.charCodeAt()-'a'.charCodeAt()]
	let toret = '';
	const lowerstr = sentance.toLowerCase();
	[...lowerstr].forEach((character) => {
		const i = character.charCodeAt() - 'a'.charCodeAt();
		if (i >= 0 && i < 26) {
			toret += abc[i] + ' ';
		}
		else {
			toret += character;
		}
	});
	return toret;
}
module.exports.ri = ri;