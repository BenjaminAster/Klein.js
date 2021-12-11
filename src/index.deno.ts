
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
		},
		plugins: [
			// virtual({
			// 	main: typeScript,
			// }),
			terser(),
		],
	};
	const bundle = (await rollup(options));
	const javaScript: string = (await bundle.generate(options.output)).output[0].code;
	await bundle.close();

	await Deno.writeTextFile("../_/script.js", javaScript);
})();
