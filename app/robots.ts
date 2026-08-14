import type { MetadataRoute } from "next";

const siteUrl = "https://www.redtailtelematics.com";

export default function robots(): MetadataRoute.Robots {
	return {
		host: siteUrl,
		rules: {
			allow: "/",
			disallow: ["/api/", "/studio/"],
			userAgent: "*",
		},
		sitemap: `${siteUrl}/sitemap.xml`,
	};
}
