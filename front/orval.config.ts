import { defineConfig } from 'orval';
module.exports = defineConfig({
	prod: {
		input: './openapi.json',
		output: {
			baseUrl: "http://back",
			target: './src/api/site.ts',
			mode: 'tags-split',
			schemas: 'src/api/model',
		},
	},
});