import {
	SlashCommandBuilder,
	type CacheType,
	type Interaction,
} from 'discord.js';
import { BRMaps, Gamemodes } from '../lib/types';
import { usersFavourites } from '..';

const cmd = new SlashCommandBuilder()
	.setName('set-favourite')
	.setDescription(
		'set a favourite map; this will not enable notifications. run /enable to enable it'
	)
	.addIntegerOption((o) =>
		o
			.setName('mode')
			.setDescription('Select a gamemode')
			.addChoices(
				{ name: Gamemodes.Ranked, value: 0 },
				{ name: Gamemodes.Pubs, value: 1 }
			)
			.setRequired(true)
	)
	.addStringOption((o) =>
		o
			.setName('map')
			.setDescription('Select a Map')
			.addChoices(
				{ name: BRMaps.BrokenMoon, value: BRMaps.BrokenMoon },
				{ name: BRMaps.KingsCanyon, value: BRMaps.KingsCanyon },
				{ name: BRMaps.Olympus, value: BRMaps.Olympus },
				{ name: BRMaps.StromPoint, value: BRMaps.StromPoint },
				{ name: BRMaps.WorldsEdge, value: BRMaps.WorldsEdge }
			)
	);

export default {
	cmd,
	handler: (i: Interaction<CacheType>) => {
		if (!i.isChatInputCommand()) return;

		const map = i.options.getString('map', true);
		const mode = i.options.getInteger('mode', true);

		if (!mode) {
			let dupedUser = false;

			usersFavourites.ranked.forEach((v) => {
				if (v.userID === i.user.id) {
					dupedUser = true;
				}
			});

			if (dupedUser) {
				i.reply('u already set your favourite map for ranked');
				return;
			}

			usersFavourites.ranked.push({
				favouriteMap: map as BRMaps,
				notifications: false,
				userID: i.user.id,
			});

			i.reply(`done! set your favourite map to ${map} (ranked)`);
		} else {
			let dupedUser = false;

			usersFavourites.pubs.forEach((v) => {
				if (v.userID === i.user.id) {
					dupedUser = true;
				}
			});

			if (dupedUser) {
				i.reply('u already set your favourite map for pubs');
				return;
			}

			usersFavourites.pubs.push({
				favouriteMap: map as BRMaps,
				notifications: false,
				userID: i.user.id,
			});

			i.reply(`done! set your favourite map to ${map} (pubs)`);
		}
	},
};
