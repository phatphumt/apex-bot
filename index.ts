import { Client, GatewayIntentBits } from 'discord.js';
import type { FavouriteBR, CommandFile } from './lib/types';
import { Commands } from './lib/utils';

const discord = new Client({
	intents: [GatewayIntentBits.Guilds],
});

const command = await Commands.init(discord);

export const usersFavourites: {
	ranked: FavouriteBR[];
	pubs: FavouriteBR[];
	set: (bool: number, newVal: FavouriteBR[]) => void;
} = {
	ranked: [],
	pubs: [],
	set(bool, newVal) {
		if (!bool) this.ranked = newVal;
		else this.pubs = newVal;
	},
};

discord.on('ready', async () => {
	await command.register();
	console.log(
		`logged in as ${discord.user?.tag}, here's the invite link: https://discord.com/oauth2/authorize?client_id=1227129411715727400&permissions=8&scope=bot`
	);
});

discord.on('interactionCreate', async (a) => {
	command.handlers(a);
});

// setInterval(async () => {
// 	const res = await fetch(
// 		`https://api.mozambiquehe.re/maprotation?auth=${process.env.APEX_API_KEY}&version=2`
// 	);
// 	const ress: Modes = <Modes>await res.json();
// }, 10000);

try {
	await discord.login(process.env.TOKEN);
} catch (e) {
	console.log(e);
	process.exit();
}
