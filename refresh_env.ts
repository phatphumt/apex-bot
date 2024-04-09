import { $, write } from 'bun';

export async function refreshEnV() {
	const a = (await $`cat .env`.text()).split('\n');

	const b: string[] = [];

	a.forEach((v) => {
		const c = v.split('=');
		b.push(c[0]);
	});

	write(
		'types.d.ts',
		`
declare namespace NodeJS {
	export interface ProcessEnv {
		${b.map((v) => (v === '' ? '' : `${v}: string\n`))}
	}
}
`
	);
}

await refreshEnV();
