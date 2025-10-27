import { getAllBlogPosts } from "../lib/blog.js";
import fs from "fs";
import path from "path";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Ensure public folder exists
const publicDir = path.join(process.cwd(), "public");
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

export function generateSitemap() {
  const blogs = getAllBlogPosts();

  const staticPages = ["", "about", "blog"];
  const urls = [
    ...staticPages.map((page) => `${baseUrl}/${page}`),
    ...blogs.map((blog) => `${baseUrl}/blog/${blog.slug}`),
  ];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeXml(baseUrl)}</loc>
    <lastmod>${new Date("2025-01-01").toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>${escapeXml(`${baseUrl}/contact-us`)}</loc>
    <lastmod>${new Date("2025-01-01").toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${escapeXml(`${baseUrl}/blog`)}</loc>
     <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  const outputPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(outputPath, sitemapContent, "utf-8");

  console.log("✅ Sitemap generated:", outputPath);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}
