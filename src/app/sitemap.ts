import type { MetadataRoute } from "next";
import { seoLandingPages } from "@/lib/seo-pages";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/cases",
    "/socialplug-review",
    "/refund-guide",
    "/submit-report",
    "/is-socialplug-legit",
    "/socialplug-refund",
    "/socialplug-trustpilot",
    "/socialplug-chargeback",
    ...seoLandingPages.map((page) => `/${page.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
