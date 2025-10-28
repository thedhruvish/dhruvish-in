import { CONFIG } from "../config/config.js";
import { getAllBlogPosts } from "../lib/blog.js";
import fs from "fs";
import path from "path";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dhruvish.in";

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

export function generateRss() {
  const blogs = getAllBlogPosts();

  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${CONFIG.name} - ${CONFIG.title}</title>
    <link>${baseUrl}</link>
    <description>${CONFIG.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${blogs
      .map(
        (blog) => `
    <item>
      <title>${escapeXml(blog.frontmatter.title)}</title>
      <link>${baseUrl}/blog/${blog.slug}</link>
      <guid>${baseUrl}/blog/${blog.slug}</guid>
      <pubDate>${new Date(blog.frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(blog.frontmatter.description)}</description>
      <author>Dhruvish Lathiya</author>
      ${
        blog.frontmatter.tags
          ?.map((tag) => `<category>${escapeXml(tag)}</category>`)
          .join("\n      ") || ""
      }
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  const outputPath = path.join(publicDir, "rss.xml");
  fs.writeFileSync(outputPath, rssContent, "utf-8");

  console.log("✅ RSS feed generated:", outputPath);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateRss();
}
