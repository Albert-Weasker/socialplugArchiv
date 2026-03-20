import type { MetadataRoute } from "next";
import { getPublicCases } from "@/lib/cases";
import { seoLandingPages } from "@/lib/seo-pages";
import { siteUrl } from "@/lib/site";

const staticRoutes = [
  "",
  "/cases",
  "/socialplug-review",
  "/refund-guide",
  "/submit-report",
  "/is-socialplug-legit",
  "/socialplug-refund",
  "/socialplug-trustpilot",
  "/socialplug-chargeback",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cases = await getPublicCases();
  const caseRoutes = cases.map((item) => `/cases/${item.slug}`);

  const routes = [
    ...staticRoutes,
    ...seoLandingPages.map((page) => `/${page.slug}`),
    ...caseRoutes,
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority:
      route === "" ? 1 : route.startsWith("/cases/") ? 0.75 : 0.8,
  }));
}
