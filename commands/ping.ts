import {
	SlashCommandBuilder,
	type CacheType,
	type Interaction,
} from 'discord.js';
import { usersFavourites } from '..';

const cmd = new SlashCommandBuilder().setName('ping').setDescription('pong!');

export default {
	cmd,
	handler: (i: Interaction<CacheType>) => {
		if (!i.isChatInputCommand()) return;

		console.log(usersFavourites);
		i.reply(`pong! with ${i.client.ws.ping} ms of latency`);
	},
};
