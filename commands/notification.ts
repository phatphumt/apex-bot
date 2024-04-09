import {
	SlashCommandBuilder,
	type CacheType,
	type Interaction,
} from 'discord.js';
import { usersFavourites } from '..';

const cmd = new SlashCommandBuilder()
	.setName('notification')
	.setDescription('enable/disable notification')
	.addIntegerOption((o) =>
		o
			.setName('gamemode')
			.setDescription('Select a gamemode')
			.addChoices({ name: 'Ranked', value: 0 }, { name: 'Pubs', value: 1 })
	)
	.addIntegerOption((o) =>
		o
			.setName('mode')
			.setDescription('a')
			.addChoices(
				{ name: 'Status', value: 1 },
				{ name: 'Turn on/off', value: 0 }
			)
	);

export default {
	cmd,
	handler: (i: Interaction<CacheType>) => {
		if (!i.isChatInputCommand()) return;
		const gamemode = i.options.getInteger('gamemode', true);
		const mode = i.options.getInteger('mode', true);

		if (!mode) {
			if (!gamemode) {
				const a = usersFavourites.ranked.filter((v) => v.userID !== i.user.id);
				const b = usersFavourites.ranked.find((v) => v.userID === i.user.id);

				if (b) {
					usersFavourites.set(<number>gamemode, [
						...a,
						{
							...b,
							notifications: !b.notifications,
						},
					]);
					i.reply('enabled notifications for ranked!');
				} else {
					i.reply(
						'no favourite map in ranked yet, run `/set-favourite` to set your favourite map'
					);
				}
			} else {
				const a = usersFavourites.pubs.filter((v) => v.userID !== i.user.id);
				const b = usersFavourites.pubs.find((v) => v.userID === i.user.id);

				if (b) {
					usersFavourites.set(<number>gamemode, [
						...a,
						{
							...b,
							notifications: !b.notifications,
						},
					]);
					i.reply('enabled notifications for pubs!');
				} else {
					i.reply(
						'no favourite map in pubs yet, run `/set-favourite` to set your favourite map'
					);
				}
			}
		} else {
			const curr = usersFavourites.pubs.find((v) => v.userID === i.user.id);
			i.reply(
				`current notification status: ${curr?.notifications ? '*on*' : '*off*'}`
			);

			if (!gamemode) {
				const curr = usersFavourites.ranked.find((v) => v.userID === i.user.id);
				i.reply(
					`current notification status for ranked: ${
						curr?.notifications ? '*on*' : '*off*'
					}`
				);
			} else {
				const curr = usersFavourites.pubs.find((v) => v.userID === i.user.id);
				i.reply(
					`current notification status for pubs: ${
						curr?.notifications ? '*on*' : '*off*'
					}`
				);
			}
		}
	},
};
