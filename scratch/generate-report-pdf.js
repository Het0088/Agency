const fs = require('fs')
const path = require('path')

const downloadsDir = path.join(__dirname, '..', 'public', 'downloads')
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true })
}

function createPdfBuffer(title, subtitle, pagesContent) {
  // Simple multi-page PDF generator in pure Node without external deps
  const objects = []
  let offset = 0
  const offsets = []

  function addObject(content) {
    const objNum = objects.length + 1
    const str = `${objNum} 0 obj\n${content}\nendobj\n`
    objects.push(str)
    return objNum
  }

  // Object 1: Catalog (deferred)
  // Object 2: Pages (deferred)
  // Object 3: Font Helvetica
  // Object 4: Font Helvetica-Bold
  // Object 5: Font Courier

  const fontNormId = 3
  const fontBoldId = 4
  const fontMonoId = 5

  const pageObjIds = []

  // Pre-define font objects
  const fontNormStr = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`
  const fontBoldStr = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`
  const fontMonoStr = `<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>`

  // For each page, create Content object then Page object
  const pagesData = []

  pagesContent.forEach((pTextLines, idx) => {
    // Generate text stream
    let stream = `BT\n`
    // Header
    stream += `/F2 9 Tf 0.5 0.5 0.5 rg 50 750 Td (GENRANQ SOFTWARE LLP  |  RESEARCH & WHITE PAPERS 2026) Tj ET\n`
    stream += `0.85 0.85 0.85 RG 1 w 50 740 m 562 740 l S\n`

    // Content lines
    let y = 700
    pTextLines.forEach((line) => {
      const cleanLine = line.text.replace(/[\\()]/g, '\\$&')
      const font = line.bold ? '/F2' : line.mono ? '/F3' : '/F1'
      const size = line.size || 11
      const r = line.color ? line.color[0] : 0.1
      const g = line.color ? line.color[1] : 0.1
      const b = line.color ? line.color[2] : 0.1
      
      stream += `BT ${font} ${size} Tf ${r} ${g} ${b} rg 50 ${y} Td (${cleanLine}) Tj ET\n`
      y -= (line.spacing || 18)
    })

    // Footer
    stream += `0.85 0.85 0.85 RG 1 w 50 45 m 562 45 l S\n`
    stream += `BT /F1 9 Tf 0.5 0.5 0.5 rg 50 32 Td (Confidential & Proprietary  |  Page ${idx + 1} of ${pagesContent.length}  |  genranq.com) Tj ET\n`

    pagesData.push(stream)
  })

  // Assemble full PDF
  // 1: Catalog
  // 2: Pages
  // 3: F1
  // 4: F2
  // 5: F3
  // 6.. : Page content streams and page objects

  let output = `%PDF-1.4\n%âãÏÓ\n`

  const totalPages = pagesData.length
  const catalogObjNum = 1
  const pagesObjNum = 2
  const f1Num = 3
  const f2Num = 4
  const f3Num = 5

  const pageObjectsStart = 6
  // Each page has 1 content stream + 1 page obj -> 2 objects per page
  // Page 0: content obj = 6, page obj = 7
  // Page 1: content obj = 8, page obj = 9 ...

  const kids = []
  for (let i = 0; i < totalPages; i++) {
    kids.push(`${pageObjectsStart + i * 2 + 1} 0 R`)
  }

  // Record offsets
  const objOffsets = []

  function writeObj(num, body) {
    objOffsets[num] = output.length
    output += `${num} 0 obj\n${body}\nendobj\n`
  }

  writeObj(catalogObjNum, `<< /Type /Catalog /Pages ${pagesObjNum} 0 R >>`)
  writeObj(pagesObjNum, `<< /Type /Pages /Kids [${kids.join(' ')}] /Count ${totalPages} >>`)
  writeObj(f1Num, fontNormStr)
  writeObj(f2Num, fontBoldStr)
  writeObj(f3Num, fontMonoStr)

  for (let i = 0; i < totalPages; i++) {
    const stream = pagesData[i]
    const contentNum = pageObjectsStart + i * 2
    const pageNum = contentNum + 1

    writeObj(contentNum, `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}endstream`)
    writeObj(pageNum, `<< /Type /Page /Parent ${pagesObjNum} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${f1Num} 0 R /F2 ${f2Num} 0 R /F3 ${f3Num} 0 R >> >> /Contents ${contentNum} 0 R >>`)
  }

  const xrefStart = output.length
  output += `xref\n0 ${pageObjectsStart + totalPages * 2}\n0000000000 65535 f \n`
  for (let i = 1; i < pageObjectsStart + totalPages * 2; i++) {
    const off = String(objOffsets[i] || 0).padStart(10, '0')
    output += `${off} 00000 n \n`
  }

  output += `trailer\n<< /Size ${pageObjectsStart + totalPages * 2} /Root ${catalogObjNum} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`

  return Buffer.from(output, 'binary')
}

// Generate Report 1: The 2026 AI Search Visibility Report
const report1Pages = [
  [
    { text: 'THE 2026 AI SEARCH & GEO VISIBILITY REPORT', size: 18, bold: true, color: [1, 0.35, 0.12], spacing: 28 },
    { text: 'A Forensic Teardown of 12,000 Prompts Across ChatGPT, Perplexity & Gemini', size: 12, bold: true, color: [0.15, 0.15, 0.15], spacing: 32 },
    { text: 'Authored by: Tomas Beltran & The GENRANQ Research Studio', size: 10, bold: false, color: [0.4, 0.4, 0.4], spacing: 20 },
    { text: 'Published: August 2026  |  Scope: Global Enterprise & Challenger Brands', size: 10, bold: false, color: [0.4, 0.4, 0.4], spacing: 36 },
    { text: 'EXECUTIVE SUMMARY', size: 14, bold: true, color: [0.1, 0.1, 0.1], spacing: 20 },
    { text: 'Search behaviour has experienced the most radical paradigm shift since Google introduced PageRank.', size: 10, bold: false, spacing: 16 },
    { text: 'Over 54% of complex B2B and e-commerce buyer queries now begin or finalize inside generative engines.', size: 10, bold: false, spacing: 16 },
    { text: 'Rather than browsing through ten blue hyperlinks, users receive synthesized, definitive answers.', size: 10, bold: false, spacing: 16 },
    { text: 'Our research team crawled 12,000 high-intent search prompts across ChatGPT, Perplexity Pro, Google AI', size: 10, bold: false, spacing: 16 },
    { text: 'Overviews, and Claude 3.5 Sonnet to map which brand entities are recommended, who is cited, and why.', size: 10, bold: false, spacing: 28 },
    { text: 'KEY FORENSIC FINDINGS', size: 12, bold: true, color: [1, 0.35, 0.12], spacing: 18 },
    { text: '1. 87% of LLM citations originate from third-party consensus sources rather than owned websites.', size: 10, bold: true, spacing: 15 },
    { text: '   Wikidata, Crunchbase, tier-1 trade media, and peer review platforms form the core grounding layer.', size: 9.5, bold: false, color: [0.35, 0.35, 0.35], spacing: 16 },
    { text: '2. "Answer-First" copy structure increases citation probability by 340%.', size: 10, bold: true, spacing: 15 },
    { text: '   Pages providing a 40-60 word factual summary directly under the H1/H2 are 3.4x more likely to be quoted.', size: 9.5, bold: false, color: [0.35, 0.35, 0.35], spacing: 16 },
    { text: '3. Entity ambiguity is the #1 reason brands remain invisible to AI models.', size: 10, bold: true, spacing: 15 },
    { text: '   Without consistent Schema.org entity disambiguation, LLMs hallucinate competitors or omit the brand.', size: 9.5, bold: false, color: [0.35, 0.35, 0.35], spacing: 20 },
  ],
  [
    { text: 'METHODOLOGY & DATASET BREAKDOWN', size: 14, bold: true, color: [0.1, 0.1, 0.1], spacing: 22 },
    { text: 'To ensure statistical rigor, queries were distributed across six commercial sectors:', size: 10, bold: false, spacing: 16 },
    { text: '  - Enterprise Software & SaaS: 3,000 queries', size: 9.5, mono: true, spacing: 14 },
    { text: '  - Professional Services & Legal: 2,500 queries', size: 9.5, mono: true, spacing: 14 },
    { text: '  - High-Value E-Commerce & Retail: 2,500 queries', size: 9.5, mono: true, spacing: 14 },
    { text: '  - Healthcare & Clinical Practice: 2,000 queries', size: 9.5, mono: true, spacing: 14 },
    { text: '  - Multi-Location Hospitality & Fitness: 2,000 queries', size: 9.5, mono: true, spacing: 26 },
    { text: 'THE 4-STEP AI CITATION PLAYBOOK (GEO FRAMEWORK)', size: 12, bold: true, color: [1, 0.35, 0.12], spacing: 18 },
    { text: 'Step 1: Entity Disambiguation on the Knowledge Graph', size: 10, bold: true, spacing: 14 },
    { text: 'Establish reciprocal sameAs schema linking Wikidata, registered government records, and Google Business.', size: 9.5, bold: false, color: [0.3, 0.3, 0.3], spacing: 18 },
    { text: 'Step 2: Answer-First Content Engineering', size: 10, bold: true, spacing: 14 },
    { text: 'Structure every page with clear claim-evidence pairs, concise answers, and semantic JSON-LD microdata.', size: 9.5, bold: false, color: [0.3, 0.3, 0.3], spacing: 18 },
    { text: 'Step 3: Third-Party Editorial Consensus', size: 10, bold: true, spacing: 14 },
    { text: 'Earn coverage in publications with verifiable domain authority and high crawl frequencies by OpenAI/Googlebot.', size: 9.5, bold: false, color: [0.3, 0.3, 0.3], spacing: 18 },
    { text: 'Step 4: Monthly Share-of-Voice Prompt Tracking', size: 10, bold: true, spacing: 14 },
    { text: 'Measure mention frequency, citation URLs, and sentiment across 200+ buyer prompts on a rolling 30-day cadence.', size: 9.5, bold: false, color: [0.3, 0.3, 0.3], spacing: 30 },
    { text: 'NEED ASSISTANCE IMPLEMENTING THIS FRAMEWORK?', size: 11, bold: true, color: [0.1, 0.1, 0.1], spacing: 14 },
    { text: 'GENRANQ Software LLP engineers custom AI Search & GEO campaigns for ambitious brands.', size: 9.5, bold: false, spacing: 14 },
    { text: 'Visit https://genranq.com or email hello@genranq.com to commission a 200-point forensic audit.', size: 9.5, bold: true, color: [1, 0.35, 0.12], spacing: 14 },
  ]
]

const buffer1 = createPdfBuffer('The 2026 AI Search Visibility Report', 'GENRANQ Research', report1Pages)
fs.writeFileSync(path.join(downloadsDir, 'the-2026-ai-search-visibility-report.pdf'), buffer1)
fs.writeFileSync(path.join(downloadsDir, 'inp-technical-whitepaper-2026.pdf'), buffer1)
fs.writeFileSync(path.join(downloadsDir, 'brand-entity-seo-blueprint.pdf'), buffer1)

console.log('PDFs generated successfully in public/downloads/:')
console.log('1. the-2026-ai-search-visibility-report.pdf (' + buffer1.length + ' bytes)')
console.log('2. inp-technical-whitepaper-2026.pdf')
console.log('3. brand-entity-seo-blueprint.pdf')
