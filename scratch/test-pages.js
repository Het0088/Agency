const http = require('http');

const urls = [
  { path: '/', name: 'Home Page' },
  { path: '/about', name: 'About Us' },
  { path: '/services', name: 'Services Directory' },
  { path: '/services/seo/technical-seo', name: 'Technical SEO Service' },
  { path: '/contact', name: 'Contact & Audit' },
  { path: '/insights', name: 'Blog & Insights Index' },
  { path: '/insights/enterprise-geo-ai-search-blueprint-2026', name: 'New Long-Form Blog Post (900w)' },
  { path: '/glossary', name: 'SEO Glossary Index' },
  { path: '/glossary/generative-engine-optimization', name: 'New Long-Form Glossary Term (900w)' },
  { path: '/resources/news', name: 'Newsroom Index' },
  { path: '/resources/news/enterprise-ai-search-indexing-platform', name: 'New Long-Form News Press Release (900w)' },
  { path: '/hire-resource', name: 'Hire Dedicated Developers' },
  { path: '/admin', name: 'Admin Portal' }
];

function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    }).on('error', err => reject(err));
  });
}

function countWords(str) {
  const clean = str.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return clean.split(' ').filter(Boolean).length;
}

async function runTests() {
  console.log('================================================================');
  console.log('GENRANQ QUALITY ASSURANCE & INTEGRATION VERIFICATION SUITE');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  for (const item of urls) {
    try {
      const res = await fetchPage(item.path);
      const isOk = res.status >= 200 && res.status < 400;
      if (isOk) {
        console.log(`[PASS] ${item.name} (${item.path}): HTTP ${res.status}`);
        passed++;
      } else {
        console.log(`[FAIL] ${item.name} (${item.path}): HTTP ${res.status}`);
        failed++;
      }

      // Check Schema JSON-LD
      const jsonLdMatches = res.body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
      if (jsonLdMatches.length > 0) {
        console.log(`       -> Found ${jsonLdMatches.length} JSON-LD schema block(s)`);
        jsonLdMatches.forEach((m, idx) => {
          try {
            const rawJson = m.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
            const parsed = JSON.parse(rawJson);
            const type = parsed['@type'] || (Array.isArray(parsed['@graph']) ? parsed['@graph'].map(g => g['@type']).join(', ') : 'Unknown');
            console.log(`          Schema [${idx+1}]: @type = "${type}"`);
          } catch (e) {
            console.log(`          Schema [${idx+1}]: [Warning] Could not parse JSON`);
          }
        });
      }

      // Specific checks for the 3 new uploads
      if (item.path.includes('enterprise-geo-ai-search-blueprint-2026')) {
        const words = countWords(res.body);
        console.log(`       -> Blog Post Word Count: ~${words} words (Target: 800-1000 words)`);
        console.log(`       -> Has image: ${res.body.includes('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe')}`);
        console.log(`       -> Has comparison table: ${res.body.includes('<table')}`);
      }

      if (item.path.includes('generative-engine-optimization')) {
        const words = countWords(res.body);
        console.log(`       -> Glossary Term Word Count: ~${words} words (Target: 800-1000 words)`);
        console.log(`       -> Has image: ${res.body.includes('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4')}`);
        console.log(`       -> Has DefinedTerm schema: ${res.body.includes('DefinedTerm')}`);
      }

      if (item.path.includes('enterprise-ai-search-indexing-platform')) {
        const words = countWords(res.body);
        console.log(`       -> News Article Word Count: ~${words} words (Target: 800-1000 words)`);
        console.log(`       -> Has image: ${res.body.includes('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')}`);
        console.log(`       -> Has NewsArticle schema: ${res.body.includes('NewsArticle')}`);
      }

      // Check Mobile Viewport meta tag
      const hasViewport = res.body.includes('name="viewport"') && res.body.includes('width=device-width');
      if (!hasViewport && item.path === '/') {
        console.log(`       -> [Notice] Checking viewport tag on layout`);
      }

    } catch (e) {
      console.log(`[ERROR] ${item.name} (${item.path}): ${e.message}`);
      failed++;
    }
    console.log('');
  }

  console.log('----------------------------------------------------------------');
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED across ${urls.length} target pages.`);
  console.log('================================================================');
}

runTests();
