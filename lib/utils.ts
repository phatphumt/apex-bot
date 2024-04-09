import { $ } from 'bun';
import type { CommandFile } from './types';
import { Client, type CacheType, type Interaction } from 'discord.js';

async function grep() {
	const files = (await $`cd commands && find . | grep "\\.ts"`.text()).split(
		'\n'
	);

	files.pop();

	const regex = /\.\//i;
	const cmds: CommandFile[] = await Promise.all(
		files.map(async (v) => {
			const c = await import(`../commands/${v.replace(regex, '')}`);
			return {
				cmd: c.default.cmd,
				handler: c.default.handler,
			};
		})
	);
	return cmds;
}

export class Commands {
	protected cmd: CommandFile[];
	protected client: Client;

	private constructor(cmd: CommandFile[], client: Client) {
		this.cmd = cmd;
		this.client = client;
	}

	static async init(client: Client) {
		const cmmd = await grep();
		return new Commands(cmmd, client);
	}

	async handlers(i: Interaction<CacheType>) {
		if (!i.isChatInputCommand()) return;

		const { commandName, reply } = i;

		const current = this.cmd.find((v) => v.cmd.name === commandName);

		if (!current) {
			reply(`no such command: ${commandName}`);
			return;
		}

		current.handler(i);
	}

	async register() {
		this.cmd.forEach((v, i) => {
			if (!v.cmd) {
				throw new Error(`no cmd for ${i + 1}`);
			}
			if (!v.handler) {
				throw new Error(`no handler for ${v.cmd.name}`);
			}
			this.client.application?.commands.create(v.cmd);
			console.log(`registered: ${v.cmd.name}`);
		});
	}
}
