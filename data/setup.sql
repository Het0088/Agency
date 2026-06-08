CREATE TABLE IF NOT EXISTS posts (
  id VARCHAR(100) PRIMARY KEY,
  type ENUM('article','blog') NOT NULL DEFAULT 'article',
  tag VARCHAR(100) NOT NULL DEFAULT '',
  title VARCHAR(500) NOT NULL,
  description TEXT,
  content LONGTEXT,
  author VARCHAR(200) NOT NULL DEFAULT '',
  read_time VARCHAR(50) NOT NULL DEFAULT '',
  slug VARCHAR(200) NOT NULL UNIQUE,
  cover_gradient VARCHAR(10) NOT NULL DEFAULT 'g1',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  published TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_published (published),
  INDEX idx_created (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS page_content (
  page VARCHAR(255) NOT NULL,
  block_key VARCHAR(100) NOT NULL,
  content TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (page, block_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS page_meta (
  route VARCHAR(255) PRIMARY KEY,
  title VARCHAR(500) NOT NULL DEFAULT '',
  description TEXT,
  canonical VARCHAR(500),
  og_title VARCHAR(500),
  og_description TEXT,
  og_image VARCHAR(500),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS cities (
  slug VARCHAR(200) PRIMARY KEY,
  city_name VARCHAR(200) NOT NULL,
  state VARCHAR(100) NOT NULL DEFAULT '',
  country VARCHAR(100) NOT NULL DEFAULT '',
  service VARCHAR(200) NOT NULL DEFAULT 'SEO Services',
  hero_heading TEXT,
  hero_subheading TEXT,
  description TEXT,
  meta_title VARCHAR(500),
  meta_description TEXT,
  phone VARCHAR(50),
  address VARCHAR(500),
  population VARCHAR(20),
  local_keywords TEXT,
  testimonial_name VARCHAR(200),
  testimonial_role VARCHAR(200),
  testimonial_quote TEXT,
  active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active (active),
  INDEX idx_country (country)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO posts (id, type, tag, title, description, author, read_time, slug, cover_gradient, created_at) VALUES
('ai-search-playbook-2026', 'article', 'AI Search', 'How LLMs choose which brands to cite — and how to be one of them.', 'A teardown of 4,200 AI answers across ChatGPT, Perplexity, and Gemini.', 'Tomas Beltran', '14 min', '/insights/ai-search-playbook-2026', 'g1', '2026-04-28 10:00:00'),
('core-web-vitals-2026', 'article', 'Technical SEO', 'The Core Web Vitals checklist most agencies still get wrong in 2026.', 'INP replaced FID a year ago. Half the audits we see still measure the wrong thing.', 'Daniel Whitford', '11 min', '/insights/core-web-vitals-2026', 'g2', '2026-04-22 10:00:00'),
('multi-location-seo', 'article', 'Local SEO', 'Multi-location SEO at scale: lessons from 22 yoga studios.', 'How we built a programmatic local system that turned 4 studios into 22.', 'Farah Khoury', '9 min', '/insights/multi-location-seo', 'g3', '2026-04-17 10:00:00'),
('brand-entity-seo', 'article', 'AI Search', 'Brand entity SEO: the Wikipedia-Wikidata-Crunchbase loop that LLMs train on.', 'If your brand is not a recognized entity in the open web, LLMs will not reliably cite you.', 'Tomas Beltran', '13 min', '/insights/brand-entity-seo', 'g2', '2026-03-21 10:00:00'),
('ai-content-workflows', 'blog', 'Editorial', 'Why "AI-written content" tanks — and what hybrid workflows look like.', 'We tested four content workflows across 80 articles. The winner was surprising.', 'Marisol Acevedo', '16 min', '/insights/ai-content-workflows', 'g4', '2026-04-11 10:00:00'),
('death-of-guest-post', 'blog', 'Digital PR', 'The death of the guest post (and what replaced it for our clients).', 'Earned editorial mentions are now 4x more valuable than guest posts.', 'Kemi Adeyemi', '8 min', '/insights/death-of-guest-post', 'g5', '2026-04-04 10:00:00'),
('maple-oak-case-study', 'blog', 'Case study', 'How we got Maple & Oak from local-only to a national brand.', 'The full 18-month playbook: audit, fixes, content, digital PR, AI-search.', 'Anaya Sharma', '22 min', '/insights/maple-oak-case-study', 'g6', '2026-03-28 10:00:00'),
('state-of-seo-2026', 'blog', 'Industry report', 'The State of Small Business SEO 2026 — full report, 412 brands surveyed.', 'Our annual research drop. What is working, what is not, where AI search is reshaping outcomes.', 'Anaya Sharma', 'Industry report', '/insights/state-of-seo-2026', 'g1', '2026-03-08 10:00:00');
