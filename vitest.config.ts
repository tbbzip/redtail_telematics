import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./", import.meta.url)),
		},
	},
	test: {
		coverage: {
			include: [
				"app/api/health/route.ts",
				"app/api/leads/route.ts",
				"lib/leads/attribution.ts",
				"lib/leads/deliver.ts",
				"lib/leads/rate-limit.ts",
				"lib/leads/schema.ts",
				"lib/production-readiness.ts",
			],
			provider: "v8",
			reporter: ["text", "json-summary"],
			thresholds: {
				branches: 75,
				functions: 85,
				lines: 85,
				perFile: true,
				statements: 85,
			},
		},
		environment: "node",
		include: ["tests/unit/**/*.test.ts"],
	},
});
