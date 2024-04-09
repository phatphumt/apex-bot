// import {
// 	EmbedBuilder,
// 	managerToFetchingStrategyOptions,
// 	SlashCommandBuilder,
// 	type CacheType,
// 	type Client,
// 	type Interaction,
// } from 'discord.js';
// import { BRMaps, Gamemodes, usersFavourites } from '.';
// import PingCommand from './commands/ping';

// // TODO: Refactor this shit

// export class Commands {
// 	private commands: CommandType[];
// 	private client: Client<true>;

// 	constructor(cmd: CommandType[], client: Client<boolean>) {
// 		this.commands = cmd;
// 		this.client = <Client<true>>client;
// 	}

// 	initCmds() {
// 		this.commands.forEach((v) => {
// 			const cmd = new SlashCommandBuilder()
// 				.setName(v.name)
// 				.setDescription(v.desc);

// 			if (v.mapOptions) {
// 				cmd.addStringOption((o) =>
// 					o
// 						.setName('map')
// 						.addChoices(
// 							{ name: 'Broken Moon', value: 'Broken Moon' },
// 							{ name: 'Strom Point', value: 'Strom Point' },
// 							{ name: 'Olympus', value: 'Olympus' },
// 							{ name: "World's Edge", value: "World's Edge" },
// 							{ name: 'Kings Canyon', value: 'Kings Canyon' }
// 						)
// 						.setRequired(true)
// 				);
// 				console.log('adding options: map');
// 			}

// 			if (v.rankedPubsOptions) {
// 				cmd.addStringOption((o) =>
// 					o
// 						.setName('mode')
// 						.addChoices(
// 							{ name: 'Ranked', value: 'Ranked' },
// 							{ name: 'Pubs', value: 'Pubs' }
// 						)
// 						.setRequired(true)
// 				);
// 				console.log('adding options: ranked/pubs');
// 			}

// 			this.client.application.commands.create(cmd);
// 			console.log(`registered: ${v.name}`);
// 		});
// 	}

// 	setHandlers(interaction: Interaction<CacheType>) {
// 		if (!interaction.isChatInputCommand()) return;

// 		const current = this.commands.find(
// 			(v) => v.name === interaction.commandName
// 		);

// 		if (!current) {
// 			console.error(`no command named ${interaction.commandName} found`);
// 			return;
// 		}

// 		current.handler(interaction);
// 	}
// }

// export type ModeSubbody = {
// 	start: number;
// 	end: number;
// 	readableDate_start: string;
// 	readableDate_end: string;
// 	map: string;
// 	code: string;
// 	DurationInSecs: number;
// 	DurationInMinutes: number;
// 	asset: string;
// 	remainingSecs: number;
// 	remainingMins: number;
// 	remainingTimer: string;
// };

// export type Mode = {
// 	current: ModeSubbody;
// 	next: ModeSubbody;
// };

// export type LTM = {
// 	current: ModeSubbody & { eventName: string };
// 	next: ModeSubbody & { eventName: string };
// };

// export type Modes = {
// 	battle_royale: Mode;
// 	ranked: Mode;
// 	ltm: LTM;
// };

// export type CommandType = {
// 	name: string;
// 	handler: (interaction: Interaction<CacheType>) => void;
// 	desc: string;
// 	mapOptions?: boolean;
// 	rankedPubsOptions?: boolean;
// };

// export const commands: CommandType[] = [
// 	{
// 		name: 'ping',
// 		desc: 'pong',
// 		handler(interaction) {
// 			if (interaction.isChatInputCommand()) {
// 				interaction.reply(`Pong! ${interaction.client.ws.ping}`);
// 			}
// 		},
// 	},
// 	{
// 		name: 'current-map-pubs',
// 		desc: 'returns a current map in rotation for pubs',
// 		async handler(interaction) {
// 			if (interaction.isChatInputCommand()) {
// 				const res = await fetch(
// 					`https://api.mozambiquehe.re/maprotation?auth=${process.env.APEX_API_KEY}&version=2`
// 				);
// 				const ress: Modes = <Modes>await res.json();
// 				const embed = new EmbedBuilder()
// 					.setTitle('Apex Pubs map rotation')
// 					.setDescription(`Current Map: ${ress.battle_royale.current.map}`)
// 					.addFields(
// 						{
// 							name: 'Will be ended:',
// 							value: `<t:${ress.battle_royale.current.end}:R>`,
// 						},
// 						{
// 							name: 'Next Map:',
// 							value: ress.battle_royale.next.map,
// 						}
// 					)
// 					.setImage(ress.battle_royale.current.asset)
// 					.setThumbnail(
// 						'https://1000logos.net/wp-content/uploads/2021/06/logo-Apex-Legends.png'
// 					);
// 				interaction.channel?.send({ embeds: [embed] });
// 				interaction.reply(`sure! here's the current map rotation`);
// 			}
// 		},
// 	},
// 	{
// 		name: 'current-map-ranked',
// 		desc: 'returns a current map in rotation for ranked',
// 		async handler(interaction) {
// 			if (interaction.isChatInputCommand()) {
// 				const res = await fetch(
// 					`https://api.mozambiquehe.re/maprotation?auth=${process.env.APEX_API_KEY}&version=2`
// 				);
// 				const ress: Modes = <Modes>await res.json();
// 				const embed = new EmbedBuilder()
// 					.setTitle('Apex Ranked map rotation')
// 					.setDescription(`Current Map: ${ress.ranked.current.map}`)
// 					.addFields(
// 						{
// 							name: 'Will be ended:',
// 							value: `<t:${ress.ranked.current.end}:R>`,
// 						},
// 						{
// 							name: 'Next Map:',
// 							value: ress.ranked.next.map,
// 						}
// 					)
// 					.setImage(ress.ranked.current.asset)
// 					.setThumbnail(
// 						'https://1000logos.net/wp-content/uploads/2021/06/logo-Apex-Legends.png'
// 					);
// 				interaction.channel?.send({ embeds: [embed] });
// 				interaction.reply(`sure! here's the current map rotation`);
// 			}
// 		},
// 	},
// 	{
// 		name: 'set-favourite',
// 		desc: 'set a favourite map; this will not enable notifications. run /enable to enable it.',
// 		mapOptions: true,
// 		rankedPubsOptions: true,
// 		async handler(interaction) {
// 			if (interaction.isChatInputCommand()) {
// 				const map = interaction.options.getString('map');
// 				const mode = interaction.options.getString('mode');
// 				if (!map) {
// 					interaction.reply('no maps were given');
// 					return;
// 				}

// 				if (!mode) {
// 					interaction.reply('no modes were given');
// 					return;
// 				}

// 				console.log(interaction.user.id);

// let found = false;
// switch (mode) {
// 	case Gamemodes.Ranked:
// 		usersFavourites.ranked.forEach((v) => {
// 			if (v.userID === interaction.user.id) {
// 				found = true;
// 			}
// 		});
// 		if (!found) {
// 			usersFavourites.ranked.push({
// 				favouriteMap: <BRMaps>map,
// 				userID: interaction.user.id,
// 				notifications: false,
// 			});
// 		}
// 		break;
// 	case Gamemodes.Pubs:
// 		usersFavourites.pubs.forEach((v) => {
// 			if (v.userID === interaction.user.id) {
// 				found = true;
// 			}
// 		});
// 		if (!found) {
// 			usersFavourites.pubs.push({
// 				favouriteMap: <BRMaps>map,
// 				userID: interaction.user.id,
// 				notifications: false,
// 			});
// 		}
// 		break;
// }
// 			}
// 		},
// 	},
// ];

// export abstract class CommandBase {
// 	protected command: SlashCommandBuilder;
// 	protected handler: (i: Interaction<CacheType>) => void;

// 	constructor(
// 		command: SlashCommandBuilder,
// 		handler: (i: Interaction<CacheType>) => void
// 	) {
// 		this.command = command;
// 		this.handler = handler;
// 	}
// }
