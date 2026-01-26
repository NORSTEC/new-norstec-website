import type { MetadataRoute } from "next";
// import { getProjectSlugs } from "@/sanity/fetch/getSlugs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://norstec.no";

    // -----------------------------
    // Static pages
    // -----------------------------
    const staticRoutes = [
        "",
        "/about",
        "/join",
        "/initiatives",
        "/team",
        "/summit",
    ];

    const staticPages = staticRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
    }));

    // -----------------------------
    // Dynamic Sanity pages (TEMPORARILY DISABLED)
    // -----------------------------
    /*
    const projects = await getProjectSlugs();

    const projectPages = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug.current}`,
      lastModified: new Date(project._updatedAt),
    }));
    */

    return [
        ...staticPages,
        // ...projectPages,
    ];
}
