import { visionTool } from "@sanity/vision";
import { buildLegacyTheme, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import {
	RedtailStudioIcon,
	RedtailStudioLogo,
} from "./sanity/components/redtail-studio-brand";
import { postDocumentBadges } from "./sanity/document-badges";
import { apiVersion, dataset, projectId, studioUrl } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const redtailStudioTheme = buildLegacyTheme({
	"--black": "#111111",
	"--brand-primary": "#d91016",
	"--component-bg": "#ffffff",
	"--component-text-color": "#111111",
	"--default-button-primary-color": "#d91016",
	"--focus-color": "#d91016",
	"--gray": "#6b6b6b",
	"--main-navigation-color": "#111111",
	"--main-navigation-color--inverted": "#ffffff",
	"--state-danger-color": "#d91016",
	"--white": "#ffffff",
});

export default defineConfig({
	basePath: studioUrl,
	dataset,
	icon: RedtailStudioIcon,
	logo: RedtailStudioLogo,
	name: "default",
	plugins: [
		structureTool({
			structure,
		}),
		visionTool({ defaultApiVersion: apiVersion }),
	],
	projectId,
	schema: {
		types: schemaTypes,
	},
	document: {
		badges: (prev, context) =>
			context.schemaType === "post" ? [...prev, ...postDocumentBadges] : prev,
	},
	theme: redtailStudioTheme,
	title: "Redtail Studio",
});
