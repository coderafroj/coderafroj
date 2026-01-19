import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://coderafroj.vercel.app';
const notesPath = path.join(__dirname, '../src/data/computerNotes.js');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Static routes with priority
const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'monthly' },
    { url: '/notes', priority: '0.9', changefreq: 'weekly' },
    { url: '/projects', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/tutorials', priority: '0.8', changefreq: 'monthly' },
    { url: '/github', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'yearly' },
    { url: '/login', priority: '0.5', changefreq: 'yearly' },
    { url: '/register', priority: '0.5', changefreq: 'yearly' },
];

try {
    // Read notes file
    const notesContent = fs.readFileSync(notesPath, 'utf8');

    // Extract IDs using Regex (looking for id: 'value' or id: "value")
    const idRegex = /id:\s*['"]([^'"]+)['"]/g;
    let match;
    const noteIds = [];

    while ((match = idRegex.exec(notesContent)) !== null) {
        noteIds.push(match[1]);
    }

    console.log(`Found ${noteIds.length} notes.`);

    // Generate XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static routes
    staticRoutes.forEach(route => {
        sitemap += `
  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    });

    // Add dynamic note routes
    noteIds.forEach(id => {
        sitemap += `
  <url>
    <loc>${baseUrl}/notes/${id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    // Write to file
    fs.writeFileSync(sitemapPath, sitemap);
    console.log(`Sitemap generated successfully at ${sitemapPath}`);

} catch (error) {
    console.error('Error generating sitemap:', error);
}
