import {
	EmbedBuilder,
	SlashCommandBuilder,
	type CacheType,
	type Interaction,
} from 'discord.js';
import type { Modes } from '../lib/types';

const cmd = new SlashCommandBuilder()
	.setName('current-map')
	.setDescription('get a current map rotation')
	.addIntegerOption((o) =>
		o
			.setName('mode')
			.setRequired(true)
			.setDescription('mode')
			.addChoices(
				{ name: 'Ranked', value: 0 },
				{ name: 'Pubs', value: 1 },
				{ name: 'Mixtape', value: 2 }
			)
	);

export default {
	cmd,
	handler: async (interaction: Interaction<CacheType>) => {
		if (!interaction.isChatInputCommand()) return;

		const mode = interaction.options.getInteger('mode');
		const res = await fetch(
			`https://api.mozambiquehe.re/maprotation?auth=${process.env.APEX_API_KEY}&version=2`
		);
		const { battle_royale, ranked, ltm }: Modes = <Modes>await res.json();
		let options = {
			currEnd: 0,
			nextMap: '',
			currAsset: '',
			currMap: '',
			name: '',
		};

		switch (mode) {
			case 0:
				options = {
					currAsset: ranked.current.asset,
					currEnd: ranked.current.end,
					nextMap: ranked.next.map,
					currMap: ranked.current.map,
					name: 'Ranked',
				};
				break;
			case 1:
				options = {
					currAsset: battle_royale.current.asset,
					currEnd: battle_royale.current.end,
					nextMap: battle_royale.next.map,
					currMap: battle_royale.current.map,
					name: 'Pubs',
				};
				break;
			case 2:
				options = {
					currAsset: ltm.current.asset,
					currEnd: ltm.current.end,
					nextMap: `${ltm.next.map} - ${ltm.next.eventName}`,
					currMap: `${ltm.current.map} - ${ltm.current.eventName}`,
					name: 'Mixtape',
				};
				break;
			default:
				options = {
					currAsset: battle_royale.current.asset,
					currEnd: battle_royale.current.end,
					nextMap: battle_royale.next.map,
					currMap: battle_royale.current.map,
					name: 'Pubs',
				};
				break;
		}

		const embed = new EmbedBuilder()
			.setTitle(`Apex ${options.name} map rotation`)
			.addFields(
				{
					name: 'Current Map: ',
					value: options.currMap,
				},
				{
					name: 'Will be ended:',
					value: `<t:${options.currEnd}:R>`,
				},
				{
					name: 'Next Map:',
					value: options.nextMap,
				}
			)
			.setImage(options.currAsset)
			.setThumbnail(
				'https://1000logos.net/wp-content/uploads/2021/06/logo-Apex-Legends.png'
			);
		interaction.channel?.send({ embeds: [embed] });
		interaction.reply(`sure! here's the current map rotation`);
	},
};
