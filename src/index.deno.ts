
import { terser } from "https://deno.land/x/drollup@2.42.3+0.17.1/plugins/terser/mod.ts";

import { virtual } from "https://deno.land/x/drollup@2.42.3%2B0.17.1/plugins/virtual/mod.ts";

import { rollup } from "https://deno.land/x/drollup@2.58.0+0.20.0/mod.ts";

/* 

deno run --unstable --allow-read --allow-write --allow-net --no-check ../../src/index.deno.ts

*/

(async () => {
	const typeScript: string = await Deno.readTextFile("./.kleinjs/script.ts");

	const options: any = {
		// input: "main",
		input: "./.kleinjs/script.ts",
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
	const map: string = JSON.stringify({
		version: 3,
		mappings: output.output[0].map?.mappings,
		sources: ["../$/.kleinjs/script.ts"],
		file: "./script.js",
	})
	await bundle.close();

	await Deno.writeTextFile("../_/script.js", javaScript + "//# sourceMappingURL=./script.js.map");
	await Deno.writeTextFile("../_/script.js.map", map);
})();
