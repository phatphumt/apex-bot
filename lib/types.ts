import type { SlashCommandBuilder, Interaction, CacheType } from 'discord.js';

export type CommandFile = {
	cmd: SlashCommandBuilder;
	handler: (interaction: Interaction<CacheType>) => void;
};

export enum BRMaps {
	WorldsEdge = "World's Edge",
	KingsCanyon = 'Kings Canyon',
	BrokenMoon = 'Broken Moon',
	Olympus = 'Olympus',
	StromPoint = 'Strom Point',
}

export enum Gamemodes {
	Ranked = 'Ranked',
	Pubs = 'Pubs',
	Control = 'Control',
	TDM = 'TDM',
	GunRun = 'Gun Run',
}

export type ModeSubbody = {
	start: number;
	end: number;
	readableDate_start: string;
	readableDate_end: string;
	map: string;
	code: string;
	DurationInSecs: number;
	DurationInMinutes: number;
	asset: string;
	remainingSecs: number;
	remainingMins: number;
	remainingTimer: string;
};

export type Mode = {
	current: ModeSubbody;
	next: ModeSubbody;
};

export type LTM = {
	current: ModeSubbody & { eventName: string };
	next: ModeSubbody & { eventName: string };
};

export type Modes = {
	battle_royale: Mode;
	ranked: Mode;
	ltm: LTM;
};

export type FavouriteBR = {
	userID: string;
	favouriteMap: BRMaps;
	notifications: boolean;
};

export type TODO = any;
