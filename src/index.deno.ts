
// import { Language, minify } from "https://deno.land/x/minifier/mod.ts";

import { terser } from "https://deno.land/x/drollup@2.42.3+0.17.1/plugins/terser/mod.ts";

import { rollup } from "https://deno.land/x/drollup@2.58.0+0.20.0/mod.ts";


const options = {
	input: "./$/.asterjs/script.ts",
	output: {
		// dir: "./_/script.js",
		file: "./_/script.js",
		format: "es" as const,
		sourcemap: false,
	},
	plugins: [terser()],
};

const bundle = await rollup(options as any);
await bundle.write(options.output);
await bundle.close();


(async () => {

	// const javaScript = await Deno.readTextFile("./example/$/.asterjs/script.js");

	// const minified = minify(Language.JS, javaScript);

	// console.log(minified);
})();
