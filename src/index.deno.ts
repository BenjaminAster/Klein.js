
import { terser } from "https://deno.land/x/drollup@2.42.3+0.17.1/plugins/terser/mod.ts";

import { virtual } from "https://deno.land/x/drollup@2.42.3%2B0.17.1/plugins/virtual/mod.ts";

import { rollup } from "https://deno.land/x/drollup@2.58.0+0.20.0/mod.ts";

(async () => {
	const typeScript: string = await Deno.readTextFile("./.asterjs/script.ts");

	const options: any = {
		// input: "main",
		input: "./.asterjs/script.ts",
		output: {
			format: "es" as const,
			sourcemap: true,
		},
		plugins: [
			// virtual({
			// 	main: typeScript,
			// }),
			terser({
				compress: {
					// dead_code: false,
					// directives: false,
					// evaluate: false,
					// expression: true,
					// inline: false,
					// pure_getters: false,
					// side_effects: false,
					// unused: false,
				},
			}),
		],
	};
	const bundle = (await rollup(options));
	const output = await bundle.generate(options.output);
	const javaScript: string = output.output[0].code;
	const map: string = "data:application/javascript," + globalThis.encodeURI(
		JSON.stringify({
			...output.output[0].map,
			sourcesContent: undefined,
			sources: ["../$/.asterjs/script.ts"],
			names: undefined,
		})
	);
	await bundle.close();

	await Deno.writeTextFile("../_/script.js", javaScript + "//# sourceMappingURL=" + map);
})();
